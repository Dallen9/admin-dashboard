import React, {useState, useEffect, useContext} from 'react'
import {Card, Form, Container, Button} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const [validated, setValidated] = useState(false);
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
        <Container className='form-container'>
            <Card className='card-container'>
                <Card.Title className='text-center'>
                    <h3 className='mt-4'>Sign up</h3>
                </Card.Title>
                <Card.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={values => {
                            console.log(values)
                            setValidated(true)
                        }}
                        initialValues={{
                            username: '',
                            name: '',
                            email: '',
                            password: '',
                            role: ''
                        }}
                    >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form  noValidate validated={validated} onSubmit={handleSubmit}> 
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='username'
                                    values={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username && touched.username}
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
                                    isInvalid={!!errors.name && touched.name}
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
                            <Form.Group controlId='role'>
                                <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='role'
                                        values={values.role}
                                        onChange={handleChange} 
                                        as="select"
                                        isInvalid={!!errors.role && touched.role}
                                        custom
                                    >
                                        <option></option>
                                        <option>Subscriber</option>
                                        <option>Author</option>
                                    </Form.Control>
                                <Form.Control.Feedback type='invalid'>
                                    {errors.role}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </Container>
    );  
}

export default Register
