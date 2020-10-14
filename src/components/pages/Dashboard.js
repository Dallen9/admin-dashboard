import React,{Fragment, useContext, useEffect, useState} from 'react';
import {Table ,Container, Spinner, Button }from 'react-bootstrap';
import AdminContext from '../../context/admin/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import UserForm from '../users/UserForm';
import AuthContext from '../../context/auth/authContext';

const Dashboard = () => {
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    const {logout} = authContext;
    const {getUsers, loading, users, deleteUser} = adminContext;

    const [clicked, setClicked] = useState(false);

    // const onDelete =(id) => {
    //     deleteUser(id);
    // }

    const clickedBtn = () => setClicked({clicked: !clicked});  
       
    
    useEffect(() => {
        getUsers();
        //eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <Container className='loading'>
                <Spinner animation='border' size='large' />
            </Container>
        )
    } else {
        return (
            <Container fluid>
            <Table striped hover responsive>
            <Fragment>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Profile</th>
                        <th className='text-center'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                         <tr key ={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>
                                <a href='/' >
                                Visit profile
                                </a>
                            </td>
                            
                            <td style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <a href='/' onClick={console.log('deleted')} >
                                    <FontAwesomeIcon   icon={faTrash} style={{ color: 'red'}} />
                                    </a>                                    
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Fragment>
            </Table>
            {clicked && <UserForm clicked={clicked} /> } 
            <Button className='add-btn' onClick={clickedBtn} >Add User</Button>
            <span style={{display: 'inline-block', float:'right'}}><Button onClick={logout}>Logout</Button></span>
            </Container>
        )
    }
}

export default Dashboard
