
import React, {useEffect, useState} from 'react'
import './myaccount.css';
import { Navigate, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
const MyAccount = () => {
  const loginUser = JSON.parse(localStorage.getItem('LoginUser'));
  if(!loginUser){
      Navigate('/login');
    }
  return (
    <>
    <div>
       <h3 >My Account Details</h3>
    </div>
    <Container>
  <Row>
   
    <Col>
    
    <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th className=''>NAME :</th>
        <th>{loginUser.fullname}</th>
      </tr>
      <tr>
        <th>USERNAME :</th>
        <th>{loginUser.username}</th>
      </tr>
      <tr>
        <th>ACCOUNT NUMBER :</th>
        <th>{loginUser.Accntno}</th>
      </tr>
      <tr>
        <th>PASSWORD :</th>
        <th>{loginUser.password}</th>
      </tr>
    </thead>
  </Table>
    </Col>
  </Row>
</Container>
</>
  )
}

export default MyAccount
