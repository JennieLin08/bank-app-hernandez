import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupForm from './components/signup/SignupForm';
import LoginForm from './components/LoginForm';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import BudgetTracker from './components/budgettracker/BudgetTracker';
import MyAccount from './components/myaccount/MyAccount';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import LoginForm from './components/LoginForm'

function App() {
  // const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [currentForm, setCurrentForm] = useState('LoginForm');
  // const toggleForm = (formName)=>{
  //   setCurrentForm(formName);
  // }

  const currentUser = (user)=>{
    setLoggedInUser(user);
  }

  

  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
       {/* <Route path="/login" element={currentForm==="LoginForm" ? 
      <LoginForm onFormSwitch={toggleForm} setLoggedInUser={setLoggedInUser}/> :
     <SignupForm onFormSwitch={toggleForm}/>} /> */}
     
        <Route path="/login"  element={<LoginForm setLoggedInUser={setLoggedInUser}/>}/>
        <Route path="/SignUp"  element={<SignupForm />}/>
        <Route path="/budgetTracker"  element={<BudgetTracker />}/>
        <Route path="/myAccount"  element={<MyAccount />}/>
        <Route path="/dashboard"  element={<Dashboard user={loggedInUser}/>}/>
        <Route path="*" element={<Navigate to="/login"  />} />
      </Routes>
    </BrowserRouter>


    </>
  )
}

export default App
