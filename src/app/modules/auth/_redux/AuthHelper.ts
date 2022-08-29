import { AxiosStatic } from 'axios';
import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_USER = 'auth-react-user'

const getAuthOnLocal = (): AuthModel | undefined => {
    if(!localStorage){
        return;
    }
    const UserValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_USER)

    if (!UserValue) {
        return
    }
    
    try {
        const auth: AuthModel = JSON.parse(UserValue) as AuthModel
        if (auth) {
            return auth
        }
    } catch (error) {
        console.error('Something is wrong..', error)
    }

}

const setAuthOnLocal = (auth: AuthModel) => {
    if(!localStorage){
        return;
    }
    
    try {
        const UserValue = JSON.stringify(auth)
        localStorage.setItem(AUTH_LOCAL_STORAGE_USER, UserValue)
    } catch (error) {
        console.error('Something is wrong..', error)
    }
}



const removeUser = () => {
    if (!localStorage) {
        return
    }
  
    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_USER)
    } catch (error) {
        console.error('Something is wrong..', error)
    }
}

// export default function setupAxios(axios:any) {
//     axios.defaults.headers.Accept = 'application/json'
//     axios.interceptors.request.use(
//         (config: {headers: {Authorization: string}}) => {
//         const auth = getAuthOnLocal()
//         if (auth && auth.api_token) {
//             config.headers.Authorization = `Bearer ${auth.api_token}`
//         }

//         return config
//         },
//         (err: any) => Promise.reject(err)
//     )
// }

export default function setupAxios(axios: any) {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use(
        (config: { headers: { Authorization: string; }; }) => {
            const auth = getAuthOnLocal()

            if (auth && auth.authToken) {
                config.headers.Authorization = `Bearer ${auth && auth.authToken}`;
            }

            return config;
        },
        (err: any) => Promise.reject(err)
    );
}

export {
    getAuthOnLocal,
    setAuthOnLocal,
    removeUser,
    setupAxios,
    AUTH_LOCAL_STORAGE_USER
}