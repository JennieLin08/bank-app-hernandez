import React, {useEffect, useState} from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Header = () => {
  const [online,setonline] = useState(false);
  // const onlineuser = JSON.parse(localStorage.getItem('LoginUser'));
  // let online = false;
  // console.log(onlineuser);
  // if(onlineuser.id){
  //   online = true;
  // }
  const onlineuser = JSON.parse(localStorage.getItem('LoginUser'));

    // if(onlineuser.id){
    //   setonline(true);
    // }

  
  useEffect(()=>{
    if(onlineuser.id){
      setonline(true);
    }
    
     
    },[]);

  // const handleLogout = (e)=> {
  //   e.preventDefault();
  //   const userLogout = {};
  //   localStorage.setItem('LoginUser',  JSON.stringify(userLogout));
  // }
  return (
    <Navbar expand="lg"  className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand href="#home" >BANKO APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className=" d-flex justify-content-end">
          <Nav.Link href="/dashboard" ><button className='btn '>
          {(online ? 'Dashboard':'')}
            </button></Nav.Link>
            <Nav.Link href="/budgetTracker" ><small className='btn'>{(online ? 'Budget Tracker':'')}</small></Nav.Link>
            <Nav.Link href="/myAccount" ><button className='btn '> {(online ? 'My Account':'')}</button></Nav.Link>
            <Nav.Link href="/login" ><button className='btn btn-link'><small >{
                  (online ? 'Logout':'')
            }</small></button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
