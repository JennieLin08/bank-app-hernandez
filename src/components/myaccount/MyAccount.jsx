
import React, {useEffect, useState} from 'react'
import './myaccount.css';
import { Navigate, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const MyAccount = () => {

  const loginUser = JSON.parse(localStorage.getItem('LoginUser'));
  if(!loginUser){
      Navigate('/login');
    }

  return (
    <div>
       <h3 >My Account Details</h3>

       <Container>
      <Row xs={10} md={10} lg={10} className="d-flex justify-content-md-end">
        <Col className="justify-content-md-end">Name : </Col>
        <Col className="justify-content-md-start">{loginUser.fullname}</Col>
      </Row>
      <Row xs={10} md={10} lg={8}>
        <Col>Username :</Col>
        <Col>{loginUser.username}</Col>
      </Row>
      <Row xs={10} md={10} lg={10} className="justify-content-md-center">
        <Col >Account Number : </Col>
        <Col >{loginUser.Accntno}</Col>
      </Row>
      <Row xs={10} md={10} lg={10}>
        <Col>Password :</Col>
        <Col>{loginUser.password}</Col>
      </Row>
    </Container>
    </div>
  )
}

export default MyAccount
