import {Outlet, Route, Routes} from 'react-router-dom'
import { ForgotPassword } from './components/ForgotPassword'
import { Login } from './components/Login'
import { Registration } from './components/Registration'

const AuthContainer = () => {
    return(
        <div className="login-wrapper">
            <div className="login-container">
                <Outlet />
            </div>
        </div>
    )
}

const AuthRouter = () => (
    <Routes>
        <Route element={<AuthContainer />}>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route index element={<Login />} />
        </Route>
    </Routes>
)

export {AuthRouter}