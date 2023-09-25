import React, {useState} from 'react'
import { useEffect } from 'react';
import './loginform.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
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
    <h1> Login </h1>
    <div className="logincontainer">
    <div>
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
        
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        <div>
        <Form.Text className="text-muted">
            No account yet? Click
            <button onClick={
                navigateSignup
                // ()=>props.onFormSwitch('SignupForm')
        } className="btn btn-link" >Sign Up</button> 
            </Form.Text>
        </div>
        </div>
    </div>
    </>
  );
}

export default LoginForm

