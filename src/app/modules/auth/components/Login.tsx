import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFormik} from 'formik'
import { useState } from 'react';
import * as Yup from 'yup'
import { useAuth } from '../_redux/AuthRedux';
import { getUserByToken, login } from '../_redux/_actions';
import clsx from 'clsx';
import { UserModel } from '../_redux/_models';

const loginControl = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
})
  
const initialValues = {
    email: 'admin@demo.com',
    password: 'demo',
}

const Login = () => {
    const [loading, setLoading] = useState(false)
    const {saveAuth, setCurrentUser} = useAuth()
    const formik = useFormik({
        initialValues,
        validationSchema: loginControl,
        // onSubmit: async (values, {setStatus, setSubmitting}) => {
        //     setLoading(true)
        //     try {
        //         const {data: auth} = await login(values.email, values.password)
        //         saveAuth(auth)
        //         const {data: user} = await getUserByToken(auth.authToken)
        //         setCurrentUser(user)
        //     } catch (error) {
        //         console.error(error)
        //         saveAuth(undefined)
        //         setStatus('The login detail is incorrect')
        //         setSubmitting(false)
        //         setLoading(false)
        //     }
        // },
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setTimeout(() => {
              login(values.email, values.password)
                .then(({ data }) => {
                    saveAuth(data)
                    console.log(data)
                    getUserByToken(data.authToken).then((user: any) => {
                        setCurrentUser(user)
                        console.log(user)
                    })
                })
                .catch((error) => {
                    setSubmitting(false);
                    console.error(error)
                    saveAuth(undefined)
                    setStatus('The login detail is incorrect')
                    setSubmitting(false)
                    setLoading(false)
                });
            }, 1000);
          },
    })
    return (
        <div className='login-content'>
            <div className="hedding">
                <h3>STW Athentication</h3>
            </div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        {...formik.getFieldProps('email')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {'is-invalid': formik.touched.email && formik.errors.email},
                            {
                              'is-valid': formik.touched.email && !formik.errors.email,
                            }
                        )}
                        name='email'
                        autoComplete='off'
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        {...formik.getFieldProps('password')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid',
                            {
                                'is-invalid': formik.touched.password && formik.errors.password,
                            },
                            {
                                'is-valid': formik.touched.password && !formik.errors.password,
                            }
                        )} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export {Login}
