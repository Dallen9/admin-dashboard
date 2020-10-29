import React, {useState, useEffect, useContext} from 'react'
import {Card, Form, Container, Button, Row, Col , Alert} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';

const Register = (props) => {

    const authContext = useContext(AuthContext);
    const { register, error, clearErrors } = authContext;
    const [successfulRegistration, setRegistration] = useState(false);
    const [show, setShow] = useState(true);


    const handleErr = () => {
        return ( 
       <div className='text-center mb-0'>
         <Alert style={{height: '3rem'}} variant="danger" onClose={() => setShow(false)}>
          <small>Username or email already exist</small>
        </Alert>
        </div> 
       )
    }

    useEffect(() => {
        clearErrors();
    }, []);


    useEffect(() => {
        if(successfulRegistration) {
            clearErrors();
            //redirect
            props.history.push('/login');
        }

        //eslint-disable-next-line
    }, [successfulRegistration]);

  
    const schema = Yup.object({
        username: Yup.string()
        .required('Username is required')
        .max(20, 'Username is too long'),
        name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be more than 2 characters')
        .max(20, 'Username is too long'),
        email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email'),
        password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be 6 characters or more'),
        role: Yup.string()
        .required('You must select a role')
    });

    return (
        <Container style={{height: '90vh'}}>
            <Row style={{height: '100%'}}>
                <Col className='d-flex align-items-center justify-content-center'>
                <Card className='form-card my-5'>
                <Card.Title className='text-center'>
                    <h3 className='mt-4'>Sign up</h3>
                </Card.Title>
                <Card.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, actions)=> {         
                            setTimeout( () => {
<<<<<<< HEAD
                                register(values)
                                setRegistration(true)
=======
                                register(values).then(data => {
                                    setRegistration(data);
                                });
>>>>>>> auth
                                actions.setSubmitting(false)
                            
                            }, 1)
                        }}
                        initialValues={{
                            username: '',
                            name: '',
                            email: '',
                            password: '',
                            role: ''
                        }}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            {error  && error === 400 || error === 403  && show ? handleErr() : null}
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='username'
                                    values={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={errors.username && touched.username}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='name'
                                    values={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={errors.name && touched.name}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name='email'
                                    values={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={errors.email && touched.email}
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
                                    placeholder='Must have at least 6 characters'
                                    values={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={errors.password && touched.password}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='role'>
                                <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='role'
                                        values={values.role}
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        as="select"
                                        isInvalid={errors.role && touched.role}
                                        custom
                                    >
                                        <option>Please Select</option>
                                        <option>Subscriber</option>
                                        <option>Author</option>
                                    </Form.Control>
                                <Form.Control.Feedback type='invalid'>
                                    {errors.role}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" block type="submit" disabled={isSubmitting}>Sign Up</Button>
                        </Form>
                        )}
                    </Formik>
                    <p className='mt-3 text-center'>
                        Already have an account?
                        <span style={{marginLeft: 5}}>
                            <Link to='/login'>
                                Login
                            </Link>
                        </span> 
                    </p>
                </Card.Body>
            </Card>
                </Col>
            </Row>
        </Container>
    );  
}

export default Register
