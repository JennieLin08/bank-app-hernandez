import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupForm from './components/signup/SignupForm';
import LoginForm from './components/LoginForm';
import Header from './components/header/Header';
import './App.css';
// import LoginForm from './components/LoginForm'

function App() {
  const [currentForm, setCurrentForm] = useState('LoginForm');
  const toggleForm = (formName)=>{
    setCurrentForm(formName);
  }

  return (
    <>
      <Header />
      {
        
        currentForm==="LoginForm" ? <LoginForm onFormSwitch={toggleForm}/> : <SignupForm onFormSwitch={toggleForm}/>
      }


    </>
  )
}

export default App
