import React, { useEffect, useRef, useState } from 'react'
import './signupform.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import ReactDOM from "react-dom";



function SignupForm(props) {
  const userData = useRef();
  const [ password, setpassword] = useState('');
  const [ email, setemail] = useState('');
  const [confirmpass, setconfirmpass] = useState('')
  const [ cnwarning, setcnwarning] = useState(false);
  // const [userdata, setuserdata] = useState([]);


  const handleSubmit = (e)=>{
    e.preventDefault();
    if(`${confirmpass}` === `${password}`){
      console.log(`${password} ${confirmpass}`);
      props.onFormSwitch('LoginForm');

    }else{
      alert('Please check your details!');
    }

}

useEffect(()=>{
  localStorage.setItem("Email", JSON.stringify(email))
  localStorage.setItem("Password", JSON.stringify(password))
},[password]);

const handleChange = (e)=> {
  if(`${password}` !== e.target.value){
    setcnwarning(true);
  }else{
    setcnwarning(false);
  }
  setconfirmpass(e.target.value);
}
  return (
    <>
    <h1> Sign Up </h1>
    <div className="logincontainer">
    <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  placeholder="Enter email" onChange={(e)=> setemail(e.target.value)} required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
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

