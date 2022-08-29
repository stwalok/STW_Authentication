import { Link } from "react-router-dom"
import { useAuth } from "../auth"

const Dashboard = () => {
    const {currentUser, logout} = useAuth()
    return(
        <div className='dashboard-container'>
            <div className='dashboard-inner'>
                <h2>STW Dashboard</h2>
                <div>Authentication has been successfully done...</div>
                <a onClick={logout} className='btn btn-primary'>
                    Logout
                </a>
            </div>
        </div>
    )
}

export {Dashboard}