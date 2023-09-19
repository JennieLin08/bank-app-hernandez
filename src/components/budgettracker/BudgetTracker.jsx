import React , {useEffect, useState} from 'react'
import './budgettracker.css';
import { Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const BudgetTracker = () => {
   
    useEffect(()=>{
        const loginUser = JSON.parse(localStorage.getItem('LoginUser'));
        if(!loginUser){
            Navigate('/login');
          }
      },[]);
    
  return (
    <div>
      <h1> welcome to budget tracker</h1>
    </div>
  )
}

export default BudgetTracker
