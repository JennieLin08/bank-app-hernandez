import React, {useState} from 'react'
import './dashboard.css';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Dashboard = (props) => {
  const [show, setShow] = useState(false);
  // const [widthdrawAmnt,setwidthdrawAmnt] = useState(0);
let saveLoginUser = {};
    const loginUser = JSON.parse(localStorage.getItem('LoginUser'));
    if(!loginUser){
       saveLoginUser = {
        id:props.user.id,
        fullname:props.user.fullname,
        username:props.user.username,
        password: props.user.password,
        balance: props.user.balance
      }
      localStorage.setItem("LoginUser", JSON.stringify(saveLoginUser));
    }

    const handleCloseWidthdraw = () => setShow(false);
    const handleShowWidthdraw = () => setShow(true);
    const [widthdrawAmnt,setwidthdrawAmnt] = useState(0);
    
    const handleWidthdraw = (e)=>{
      e.preventDefault();
      if(widthdrawAmnt > loginUser.balance && widthdrawAmnt > 0){
        alert("Not enough Balance!")
      }else{
        saveLoginUser = {
        id:loginUser.id,
        fullname:loginUser.fullname,
        username:loginUser.username,
        password:loginUser.password,
        balance: loginUser.balance - widthdrawAmnt
        }
        localStorage.setItem("LoginUser", JSON.stringify(saveLoginUser));
      }
      setShow(false);
    }
   

  return (
    <>    
    <h1> Welcome to Dashboard     {loginUser.username}  </h1>
    <div className="accountbal-container">
      <div className='row'>
    Account Balance:  {loginUser.balance}
      </div>
    </div>

    <div className="bankbtn-container">
      <button className='btn btn-dark'>Deposit</button>
      <button className='btn btn-dark'>Send Money</button>
    </div>

    <Button variant="dark" onClick={handleShowWidthdraw}>
    Widthdraw
  </Button>

  <Modal show={show} onHide={handleCloseWidthdraw}>
    <Modal.Header closeButton>
      <Modal.Title>Enter Amount</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <input type="number" onChange={(e)=> setwidthdrawAmnt(e.target.value)} required/>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseWidthdraw}>
        Close
      </Button>
      <Button variant="primary" onClick={handleWidthdraw}>
        Widthdraw
      </Button>
    </Modal.Footer>
  </Modal>

    </>

  )
}

export default Dashboard
