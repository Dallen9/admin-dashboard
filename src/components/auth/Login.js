import React, {useState, useEffect, useContext} from 'react';
import {Card, Form, Container, Button} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Login = () => {

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
        onSubmit={values => {
            console.log(values)
        }}
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
        errors,
      }) => (
           
                <Form  noValidate  onSubmit={handleSubmit}>  
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
                            placeholder='Must have at least 6 characters'
                            values={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password && touched.password}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </Form>
      
        )}
    </Formik>
                <p className='mt-3'>Don't have an account? Sign up</p>
    </Card.Body>
        </Card>   
    </Container>

    )
}

export default Login
