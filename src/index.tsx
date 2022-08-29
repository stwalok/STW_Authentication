import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import { AppRoutes } from './app/app_router/AppRouter'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {mockAxios} from './_common/_mock/mockAxios'
import './style.scss'

mockAxios(axios)
setupAxios(axios)
console.log('setupAxios(axios)',mockAxios(axios));

const queryClient = new QueryClient()
const container = document.getElementById('root')


if (container) {
    createRoot(container).render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
