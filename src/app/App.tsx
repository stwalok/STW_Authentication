import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import { LayoutSplashScreen } from '../_common/SplashScreen'
import {AuthInit} from './modules/auth'

const App = () => {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <AuthInit>
                <Outlet />
            </AuthInit>
        </Suspense>
    )
}

export {App}
