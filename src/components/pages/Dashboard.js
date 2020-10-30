import React, {useContext, useEffect, useState} from 'react';
import {Table ,Container, Spinner, Button }from 'react-bootstrap';
import AdminContext from '../../context/admin/adminContext';
import AuthContext from '../../context/auth/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import UserForm from '../users/UserForm';
import {Link} from 'react-router-dom';

const Dashboard = () => {
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    const {getUsers, loading, users, deleteUser, clearCurrent} = adminContext;
    const {user} = authContext;

    const [clicked, setClicked] = useState(false);
    const [userAdded, setUserAdded] = useState(false);

    const onDelete =(id) => {
        deleteUser(id)
        clearCurrent() 
    }

    const clickedBtn = () => setClicked({clicked: !clicked});  
    useEffect(() => {
        if(userAdded && !loading) {
            setUserAdded(false)
            setClicked(false)
            getUsers()
           }
    }, [userAdded, clicked, loading])

    useEffect(() => {
            getUsers()
        //eslint-disable-next-line
    }, []);


        return (
            <>
            {users && users != null && !loading ? (
            <Container fluid>
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
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
                                <td>{user.role}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to='/' >
                                    Visit profile
                                    </Link>
                                </td>
                                <td style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Link to='/home'>
                                    <FontAwesomeIcon onClick={() => onDelete(user._id)}  icon={faTrash} style={{ color: 'red'}} />
                                    </Link>                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {clicked && <UserForm  clicked={clicked} setUserAdded={setUserAdded} /> } 
                <Button className='add-btn' onClick={clickedBtn} >Add User</Button>
            </Container>
            ) : (
                <Container className='loading'>
                    <Spinner animation='border' size='large' />
                </Container>
            )}
            </>
        );
    
}

export default Dashboard
