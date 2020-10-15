import React, {useState, useEffect, useContext} from 'react'
import {Form, Button, Modal, ModalFooter} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AdminContext from '../../context/admin/adminContext';

const UserForm = ({clicked}) => {
    const adminContext = useContext(AdminContext);
    const {addUser} = adminContext;

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const refreshPage = () => {
        window.location.reload(false);
      }

      useEffect(() => {
          
        if(clicked) {
            handleShow();
        }

        if(validated) {
            refreshPage();
        }

    }, [validated, clicked])

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
            <>
            <Modal
             show={show}
             onHide={handleClose}
             backdrop="static"
             keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title className='text-center'>Create new user</Modal.Title>
          </Modal.Header>
          <Formik
                            validationSchema={schema}
                            onSubmit={(values)=> {
                                setValidated(true)
                                addUser(values)
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
                            errors
                        }) => (

                            <Form  noValidate validated={validated} onSubmit={handleSubmit}> 
                                <Modal.Body>
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
                                            required
                                            type='text'
                                            name='role'
                                            values={values.role}
                                            onChange={handleChange} 
                                            as="select"
                                            isInvalid={!!errors.role && touched.role}
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
                                </Modal.Body>
                                <ModalFooter>
                                <Button variant="primary" block type="submit" >Create user</Button>
                                </ModalFooter>
                            </Form>
                            )}
                        </Formik>
            </Modal>
            </>
    )
}

export default UserForm
