import {
    FC,
    ReactNode,
    useState,
    useEffect,
    createContext,
    useContext,
    useRef,
    Dispatch,
    SetStateAction,
} from 'react'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelper'
import {getUserByToken} from './_actions'
import { LayoutSplashScreen } from '../../../../_common/SplashScreen'
  


export type WithChildren = {
    children?: ReactNode
}
  
type AuthContextProps = {
    auth: AuthModel | undefined
    saveAuth: (auth: AuthModel | undefined) => void
    currentUser: UserModel | undefined
    setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
    logout: () => void
}
  
const initAuthContextPropsState = {
    auth: authHelper.getAuthOnLocal(),
    saveAuth: () => {},
    currentUser: undefined,
    setCurrentUser: () => {},
    logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuthOnLocal())
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuthOnLocal(auth)
        } else {
            authHelper.removeUser()
        }
    }

    const logout = () => {
        saveAuth(undefined)
        setCurrentUser(undefined)
    }

    return (
        <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthInit: FC<WithChildren> = ({children}) => {
    const {auth, logout, setCurrentUser} = useAuth()
    const didRequest = useRef(false)
    const [showSplashScreen, setShowSplashScreen] = useState(true)
    useEffect(() => {
        const requestUser = async (apiToken: string) => {
            try {
                if (!didRequest.current) {
                    getUserByToken(apiToken).then((res)=>{
                        const {data} = res
                        if (data) {
                            setCurrentUser(data)
                        }
                    })
                }
            } catch (error) {
                console.error(error)
                if (!didRequest.current) {
                    logout()
                }
            } finally {
                setShowSplashScreen(false)
            }

            return () => (didRequest.current = true)
        }

        if (auth && auth.authToken) {
            requestUser(auth.authToken)
        } else {
            logout()
            setShowSplashScreen(false)
        }
        // eslint-disable-next-line
    }, [])

    return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
  