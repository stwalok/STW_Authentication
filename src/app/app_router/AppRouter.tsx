
import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthRouter, useAuth} from '../modules/auth'
import {App} from '../App'
import { Dashboard } from '../modules/dashboard/Dashboard'
const {PUBLIC_URL} = process.env
 
const AppRoutes: FC = () => {
    const {currentUser} = useAuth()
    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <Routes>
                <Route element={<App />}>
                    <Route path='error/*' element={<ErrorsPage />} />
                    <Route path='logout' element={<Logout />} />
                    {currentUser ? (
                    <>
                        <Route path='/*' element={<Dashboard />} />
                        <Route index element={<Navigate to='/dashboard' />} />
                        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
                    </>
                    ) : (
                    <>
                        <Route path='auth/*' element={<AuthRouter />} />
                        <Route path='*' element={<Navigate to='/auth' />} />
                    </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
 
 export {AppRoutes}
 