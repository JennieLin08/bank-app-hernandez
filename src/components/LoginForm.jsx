import React, {useState} from 'react'
import { useEffect } from 'react';
import './loginform.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function LoginForm(props) {
    const alreadyLoaded = localStorage.getItem('alreadyLoaded');
        if (!alreadyLoaded) {
           localStorage.setItem('alreadyLoaded', true);
           window.location.reload();
        }
    const { setCurrentPage, setLoggedInUser } = props
    const [username, setusername]= useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    
const accounts = JSON.parse(localStorage.getItem('accounts'));

useEffect(()=>{
let logoutuser = {}
localStorage.setItem("LoginUser", JSON.stringify(logoutuser));

  },[]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        const findUser = accounts.find(user => {
                if(username === user.username ){
                    if(password === user.password){
                        alert('Welcome to Banko App!'); 
                        navigate('/dashboard');
                        setLoggedInUser(user);
                        localStorage.setItem("LoginUser", JSON.stringify(user))
                        // console.log(user);
                        return user;
                    }
                    return false;
                }
           });

           if(!findUser){
                alert('Wrong username or Password!');
           }
    }

    const navigateSignup = (e)=>{
        e.preventDefault();
        navigate('/SignUp');
    }
  return (
    <>
    
<Container className="logincontainer">

<Row>
  <Col className='divcol'>
  <Navbar.Brand href="" ><h1 className='loginbrand'>BANKO <span className="appStyle">APP</span> </h1>
        <div className='loginsmall'><h4>'It’s your money.'</h4></div>
        </Navbar.Brand>
  </Col>

  <Col>
    <div >
        <div className='loginform'>
        <h5> Login </h5>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLoginusername">
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={(e)=>setusername(e.target.value)} type="text" placeholder="Enter username" required/>
            <Form.Text className="text-muted">
            We'll never share your data with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required/>
        </Form.Group>
        
        <Button variant="primary" className='btnlogin' type="submit">
            Submit
        </Button>
        </Form>
        <div>
        <Form.Text className="text-muted">
            No account yet? Click
            <button onClick={
                navigateSignup
        } className="btn btn-link btnSignup" >Sign Up</button> 
            </Form.Text>
        </div>
        </div>
    </div>
    <div className='bot'>
        <h1>  </h1>
    </div>
    </Col>
  </Row>
</Container>
    </>
  );
}

export default LoginForm

