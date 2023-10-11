import React, {useEffect, useState} from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  let online = false;
  const onlineuser = JSON.parse(localStorage.getItem('LoginUser'));
  if(onlineuser){
    if(onlineuser.id){
      online = true;
    }
  }

  useEffect(()=>{
    
    },[]);

  const handleLogout = (e)=> {
    window. location. reload();
  }
  return (
    <Navbar expand="lg"  className="bg-body-tertiary nav">
      <Container>
        <Navbar.Brand href="#home" ><span className='brand'>BANKO <span className="appStyle">APP</span> </span>
        <div className='small'>'It’s your money.'</div>
        </Navbar.Brand>
        {(online ? <Navbar.Toggle aria-controls="basic-navbar-nav" /> : '')}
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className=" d-flex justify-content-end">
          <Nav.Link href="/dashboard" ><button className='btn '>
          {(online ? 'Dashboard':'')}
            </button></Nav.Link>
            <Nav.Link href="/budgetTracker" ><small className='btn'>{(online ? 'Budget Tracker':'')}</small></Nav.Link>
            <Nav.Link href="/myAccount" ><button className='btn '> {(online ? 'My Account':'')}</button></Nav.Link>
            <Nav.Link href="/login" ><button className='btn btn-link' onClick={handleLogout}><small >{
                  (online ? 'Logout':'')
            }</small></button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
