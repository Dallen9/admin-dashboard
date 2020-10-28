import React, {useState, useEffect, useContext} from 'react';
import {Card, Form, Container, Button, Row, Col, Alert} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';


const Login = (props) => {

    const authContext = useContext(AuthContext);
    const { login, isAuth, error, clearErrors} = authContext;
    const [show, setShow] = useState(true);
    const [successLogin, setLogin] = useState(false);

    const handleErr = () => {
        return ( 
       <div className='text-center mb-0'>
         <Alert style={{height: '3rem'}} variant="danger" onClose={() => setShow(false)} >
          <p>There was a problem with your login.</p>
        </Alert>
        </div> 
       )
    }
  
    useEffect(() => {
        if(successLogin) {
            clearErrors()
            //redirect
            props.history.push('/');
        }

        //eslint-disable-next-line
    }, [successLogin, props.history]);



  
    const schema = Yup.object({
        email: Yup.string()
        .required('Please enter your email')
        .email('Please enter a valid email'),
        password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be 6 characters or more')
    });

    return (
        <Container style={{height: '90vh'}}>
            <Row style={{height: '100%'}} >
                <Col className='d-flex align-items-center justify-content-center'>
                <Card className='form-card'>
                <Card.Title className='text-center mb-0'>
                    <h3 className='mt-4'>Login</h3>
                </Card.Title>
                <Card.Body>
                    <Formik  initialValues={{
                        email: '', 
                        password: ''
                    }}
                    validationSchema={schema}
                   onSubmit={(values, actions) => {
                    setTimeout(() => {
                        setLogin(login(values))
                        actions.setSubmitting(false)
                    }, 5)
                    }}
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
        
                    isSubmitting
                }) => (   
                    <Form onSubmit={handleSubmit}> 
                        {error && error === 400  && show ? handleErr() : null}
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                values={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                                onBlur={handleBlur}
                                isInvalid={!!errors.password && touched.password}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" block disabled={isSubmitting} >Login</Button>
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
                </Col>
            </Row>
    </Container>

    )
}

export default Login
