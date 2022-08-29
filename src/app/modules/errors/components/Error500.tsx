import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_common/UrlHelper'

const Error500: FC = () => {
    return (
        <div className='error-container'>
            <div className='error-inner'>
                <h2>500</h2>
                <div>Something is wrong there...</div>
                <Link to='/' className='btn btn-primary'>
                    Return Home
                </Link>
            </div>
        </div>
    )
}

export {Error500}
