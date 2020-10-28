import React, {useContext, useEffect, useState} from 'react'
import {Container, Row, Col, Button, Form, Toast} from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';


const Account = () => {
    const authContext = useContext(AuthContext);

    const{updateUser,  user} = authContext;

    const [update, setUpdate] = useState({
        name: '',
        email: '',
        username: '',
    });

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const onChange = (e) => 
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        }) 

    const onSubmit= (e) => {
        e.preventDefault();
        
        if (update !== null) {
            updateUser(update)
            setShow(true);
            setValidated(true);
        } 
       
    }

    useEffect(() => {
        setUpdate({
            ...user
        }) 
        // eslint-disable-next-line
    }, [user])

    return (
        <Container noValidate  className='my-5'>
            <Row>
            <Col md={6} className='mx-auto'>
                    <div className='p-3 py-5'>
                        <div className='d-flex justify-content-between align-items-center '>
                            <h4 className='text-right'> Update Account</h4>
                        </div>
                    </div>
                    <Form onSubmit={onSubmit}>
                        
                        <Row>
                            <Col md={6} lg={12}>
                               <Form.Group controlId="name">
                                   <Form.Label>Name</Form.Label>
                                   <Form.Control 
                                   type='text'
                                   name='name'
                                   onChange={onChange}
                                   value={update.name || ''}
                                    required                               
                                   />
                                     <Form.Control.Feedback type='invalid'>
                                        Please input a valid name
                                   </Form.Control.Feedback>
                               </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6} lg={12}>
                            <Form.Group controlId="email">
                                   <Form.Label>Email</Form.Label>
                                   <Form.Control 
                                   type='email'
                                   name='email'
                                   onChange={onChange}
                                   value={update.email || ''}
                                    required
                                   />
                                     <Form.Control.Feedback type='invalid'>
                                        Please input a valid email
                                   </Form.Control.Feedback>
                               </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6} lg={12}>
                            <Form.Group controlId="Username">
                                   <Form.Label>Username</Form.Label>
                                   <Form.Control 
                                   type='text'
                                   name='username'
                                   onChange={onChange}
                                   value={ update.username || ''}
                                   required
                                   />
                                   <Form.Control.Feedback type='invalid'>
                                        Please input a valid username
                                   </Form.Control.Feedback>
                               </Form.Group>
                            </Col>
                        </Row>
                        <Button type='submit' onClick={() => setShow(true) } >Update profile</Button>
                    </Form>
                    {updateUser && validated &&
                    <Row className='mt-3'>
                        <Col xs={6}>
                            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                                <Toast.Header>
                                    <strong className="mr-auto" style={{color: 'green'}}>Account successfully updated</strong>
                                </Toast.Header>
                            </Toast>
                        </Col>
                    </Row>
                }
                </Col>
            </Row>
        </Container>
    )
}

export default Account
