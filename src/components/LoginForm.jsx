import React, {useState} from 'react'
import './loginform.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm(props) {
    const [email, setEmail]=useState('');
    const [password , setPassword] = useState('');

const [lsemail, setlsEmail] = useState ( () => {
 const savedlsEmail = localStorage.getItem("Email");
const parsedlsEmail = JSON.parse(savedlsEmail);
return parsedlsEmail || "";
});

const [lspassword, setlsPassword] = useState ( () => {
    const savedlspass = localStorage.getItem("Password");
   const parsedlspass = JSON.parse(savedlspass);
   return parsedlspass || "";
   });


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(email === lsemail && password === lspassword){
            console.log(lspassword);
            console.log(lsemail);
            alert('Welcome to Banko App!');
        }else{
            alert('Wrong Email or Password!');
        }

        
    }
  return (
    <>
    <h1> Login </h1>
    <div className="logincontainer">
    <div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLoginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" required/>
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
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
            <button onClick={()=>props.onFormSwitch('SignupForm')} className="btn btn-link" >Sign Up</button> 
            </Form.Text>
        </div>
        </div>
    </div>
    </>
  );
}

export default LoginForm

