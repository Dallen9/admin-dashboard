import React, {useContext, useEffect, useState} from 'react'
import {Container, Card, Row, Col, Button, Image, Form, FormControl, Toast} from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = () => {
    const authContext = useContext(AuthContext);

    const{loadUser, updateUser, current, user} = authContext;

    const [update, setUpdate] = useState({
        name: '',
        email: '',
        username: ''
    });

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false)
    const [validated, setValidated] = useState(false);

    const onChange = (e) => 
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        }) 
    

    const hasErrors = () => {
        if(update && update.name === '') {
            return setError(true)
        } else if (update && update.email === '') {
            return setError(true)
        } else if (update && update.username === '') {
            return setError(true)
        }
    }
    const onSubmit= (e) => {
        e.preventDefault();
        
           
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        
        if (current !== null ) {
            updateUser(update)
            setShow(true);
        }
       
        setValidated(true);

        setUpdate({
            name: '',
            email: '',
            username: ''
        })
    }
    useEffect(() => {
        loadUser();
        if(current !== null) {
            setUpdate(current)
        } else {
            setUpdate(user)
        }
    }, [current, validated])

    return (
        <Container noValidate validated={validated} className='my-5'>
            <Row>
                <Col md={3} className='border-right'>
                    <div className='d-flex flex-column align-items-center text-center p-3 py-5'> 
                    <Image className=" mt-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF2psCzfbB611rnUhxgMi-lc2oB78ykqDGYb4v83xQ1pAbhPiB&usqp=CAU" roundedCircle/>
                        <span class="font-weight-bold">{ user && user.name}</span>
                        <span class="text-black-50">{user && user.email}</span>
                        <span>{user && user.username} </span>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='p-3 py-5'>
                        <div className='d-flex justify-content-between align-items-center '>
                            <h4 className='text-right'> Edit Profile</h4>
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
                                   value={update && update.name}
                                   placeholder={user && user.name}
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
                                   value={update && update.email}
                                   placeholder={user && user.email}
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
                                   value={update && update.username}
                                   placeholder={user && user.username}
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

export default Profile
