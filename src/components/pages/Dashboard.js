import React,{Fragment, useContext, useEffect} from 'react';
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


    // const onDelete =(id) => {
    //     deleteUser(id);
    // }

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
                            {user._id}
                            <td>{user.name}</td>
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
            <Button className='add-btn'>Add User</Button>
            <span style={{display: 'inline-block', float:'right'}}><Button onClick={logout}>Logout</Button></span>
            </Container>
        )
    }
}

export default Dashboard
