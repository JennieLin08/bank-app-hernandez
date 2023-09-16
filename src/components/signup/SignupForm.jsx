import React, { useRef, useState } from 'react';
import './signupform.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import ReactDOM from "react-dom";



function SignupForm(props) {
  const userData = useRef();
  const [ password, setpassword] = useState('');
  const [ username, setusername] = useState('');
  const [ confirmpass, setconfirmpass] = useState('');
  const [ cnwarning, setcnwarning] = useState(false);
  const [ fullname, setfullname ] = useState('');
  const navigate = useNavigate();
  const [accounts, setaccounts] = useState([
    {
      id:"2351",
      fullname:'Jennie Lin',
      username:'Jennie',
      password: '123',
      balance: 1000
    }
  ]);
  const user = {
    id:uuid(),
    fullname:fullname,
    username:username,
    password: password,
    balance: 10000
  }

  // const [lsusername, setlsusername] = useState ( () => {
  //   const savedlsusername = localStorage.getItem("accounts");
  //    const parsedlsusername = JSON.parse(savedlsusername);
  //    return parsedlsusername || "";
  //    });

  const handleSubmit = (e)=>{
    e.preventDefault();

    //  lsusername.find(user => {
    //   if(username === user.username){
    //     alert('username already exists!')
    //     return false;
    //   }
    //  });

     if(confirmpass === password){
        setaccounts(oldArr => [...oldArr,user]);
        localStorage.setItem("accounts", JSON.stringify(accounts));

          // navigate('/login');
      
    }else{
      alert('confirm your password!');
    }

  }

const handleChange = (e)=> {
  if(password !== e.target.value){
    setcnwarning(true);
  }else{
    setcnwarning(false);
  }
  setconfirmpass(e.target.value);
}


  useEffect(()=>{
    if(!localStorage.getItem("accounts")){
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
    // console.log(accounts);
   
  },[]);


  return (
    <>
    <h1> Sign Up </h1>
    <div className="logincontainer">
    <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="fullname">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text"  placeholder="Enter Full Name" onChange={(e)=> setfullname(e.target.value)} required />
        <Form.Text className="text-muted">
          We'll never share your data with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text"  placeholder="Enter username" onChange={(e)=> setusername(e.target.value)} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="ConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control  className={cnwarning ? 'warning':''} type="password" placeholder="Confirm Password" onChange={handleChange} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      <div>
      <Form.Text className="text-muted">
          Already have account? Login
          <button onClick={()=>props.onFormSwitch('LoginForm')} className="btn btn-link" >Here</button> 
          </Form.Text>
      </div>
    </div>
    </div>
    </>
  );

}

export default SignupForm

