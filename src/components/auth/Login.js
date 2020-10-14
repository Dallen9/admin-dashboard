import React, {useState, useEffect, useContext} from 'react';
import {Card, Form, Container, Button} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';


const Login = (props) => {
    const [validated, setValidated] = useState(false);

    const authContext = useContext(AuthContext);
    const { login, isAuth } = authContext;

    useEffect(() => {
        if(isAuth) {
            //redirect
            props.history.push('/');
        }
        //eslint-disable-next-line
    }, [ isAuth, props.history, validated]);

    const schema = Yup.object({
        email: Yup.string()
        .required('Please enter your email')
        .email('Please enter a valid email'),
        password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be 6 characters or more')
    });

    return (
        <Container className='form-container'>
            <Card className='card-container'>
                <Card.Title className='text-center'>
                    <h3 className='mt-4'>Login</h3>
                </Card.Title>
                <Card.Body>
                    <Formik
                    validationSchema={schema}
                    onSubmit={ values => {
                        setValidated(true)
                        login(values)
                        console.log(values)
                    }
                    }
                    initialValues={{
                        email: '', 
                        password: ''
                    }}
                    
                >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors
                }) => (   
                    <Form  noValidate validated={validated} onSubmit={handleSubmit}>  
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                values={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email && touched.email}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                values={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password && touched.password}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" block>Login</Button>
                    </Form>
                )}
            </Formik>
            <p className='mt-3 text-center'>
                Don't have an account? 
                <span style={{marginLeft: 5}}>
                    <Link to='/register'>
                    Sign up
                    </Link>
                    </span>
            </p>
            </Card.Body>
        </Card>   
    </Container>

    )
}

export default Login
