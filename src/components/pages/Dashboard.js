import React from 'react'
import {Table ,Container }from 'react-bootstrap';
const Dashboard = () => {
    return (
        <Container fluid>
        <Table striped hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Profile</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>14454545</td>
                    <td>154444444444</td>
                    <td>1544444444</td>
                    <td>154444</td>
                    <td>154444444</td>
                    <td>154444</td>
                </tr>
                <tr>1</tr>
                <tr>1</tr>
                <tr>1</tr>
                <tr>1</tr>
            </tbody>
        </Table>
        </Container>
      
    )
}

export default Dashboard
