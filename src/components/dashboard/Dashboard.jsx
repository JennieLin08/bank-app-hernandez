import React, {useEffect, useState} from 'react'
import './dashboard.css';
import { Navigate, useNavigate } from 'react-router-dom'
// import { ReactTableScroll } from 'react-table-scroll';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {
  localStorage.removeItem('alreadyLoaded');
  const navigate = useNavigate();
  let saveLoginUser = {};
  const [remarks, setRemarks] = useState('');
  const [desc, setDesc] = useState('');
  const [inputAmount,setInputAmnt] = useState(0);
  const dateNow = new Date().toLocaleString();
  const [bankTrans, setbanktrans] = useState([]);

const [accntBal, setAccntBal] = useState(bal =>{
  let userAccnt = JSON.parse(localStorage.getItem('accounts'));
  let currentUser = JSON.parse(localStorage.getItem('LoginUser'));
  let activeUser= {}
  for(let i=0;i<userAccnt.length;i++){
    if(currentUser.id === userAccnt[i].id ){
      return userAccnt[i].balance ;
  }
}
});

const loginUser = JSON.parse(localStorage.getItem('LoginUser'));

if(!loginUser){
  Navigate('/login');
}

  useEffect(()=>{

    
  if(localStorage.getItem('bankTransactions')){
    const getbanktrans = localStorage.getItem('bankTransactions');
    const parsedgetbanktrans = JSON.parse(localStorage.getItem('bankTransactions'))
    setbanktrans(parsedgetbanktrans);
    // console.log(bankTrans);
  }else{
    localStorage.setItem('bankTransactions', JSON.stringify(bankTrans));
  }

   
  },[]);



    // widthraw code
    const handleCloseWidthdraw = () => setshowwidth(false);
    const handleShowWidthdraw = () => setshowwidth(true);
    const [showwidth, setshowwidth] = useState(false);

    const handleWidthdraw = (e)=>{
      e.preventDefault();
      if(confirm("Are you sure, you want to continue this transaction?")){

      if(inputAmount > accntBal && inputAmount > 0){
        alert("Not enough Balance!")
      }else{

      let userAccnt = JSON.parse(localStorage.getItem('accounts'));
      let currentUser = JSON.parse(localStorage.getItem('LoginUser'));
      for(let i=0;i<userAccnt.length;i++){
        if(currentUser.id === userAccnt[i].id ){
          userAccnt[i].balance = userAccnt[i].balance - parseInt(inputAmount);
          setAccntBal(userAccnt[i].balance);
        }
      }
      localStorage.setItem('accounts', JSON.stringify(userAccnt));
     
        if(localStorage.getItem("bankTransactions")){
          const getTrans = JSON.parse(localStorage.getItem("bankTransactions"));
          const trID = getTrans.length + 1;
          const saveTransaction = {
            transNo : trID,
            BankAmnt:accntBal,
            amount:parseInt(inputAmount),
            action:"Widthdraw",
            accountNo:currentUser.Accntno,
            username:currentUser.username,
            Description:desc,
            sendToaccntNo:'',
            sendToAccntName:'',
            date: dateNow,
            Remarks: remarks,
            currentBalance: accntBal - parseInt(inputAmount)
          }
          // setbanktrans(oldbankArr => [...oldbankArr,saveTransaction]);
          bankTrans.push(saveTransaction);
          localStorage.setItem("bankTransactions", JSON.stringify(bankTrans));
        }else{
          const trID = 1;
          const saveTransaction = {
            transNo : trID,
            BankAmnt:accntBal,
            amount:parseInt(inputAmount),
            action:"Widthdraw",
            accountNo:currentUser.Accntno,
            username:currentUser.username,
            Description:desc,
            sendToaccntNo:'',
            sendToAccntName:'',
            date: dateNow,
            Remarks: remarks,
            currentBalance: accntBal - parseInt(inputAmount) 
          }
          bankTrans.push(saveTransaction);
          localStorage.setItem("bankTransactions", JSON.stringify(bankTrans));
        }
      }
    }
      setshowwidth(false);
    }

    const [Trans, setTrans] = useState ( () => {
    const getTrans = localStorage.getItem("bankTransactions");
     const BnkTrans = JSON.parse(getTrans);
     return BnkTrans || "";
     });

    // deposit code
    const handleCloseDepo = () => setshowDepo(false);
    const handleShowDeposit = () => setshowDepo(true);
    const [showDepo, setshowDepo] = useState(false);

    const handleDepo = (e) => {
      e.preventDefault(e);
      if(confirm("Are you sure, you want to continue this transaction?")){

      let userAccnt = JSON.parse(localStorage.getItem('accounts'));
      let currentUser = JSON.parse(localStorage.getItem('LoginUser'));
      for(let i=0;i<userAccnt.length;i++){
        if(currentUser.id === userAccnt[i].id ){
          userAccnt[i].balance = userAccnt[i].balance + parseInt(inputAmount);
          setAccntBal(userAccnt[i].balance);
        }
      }
      const updateAccnts = localStorage.setItem('accounts', JSON.stringify(userAccnt));

      if(localStorage.getItem("bankTransactions")){
        const getTrans = JSON.parse(localStorage.getItem("bankTransactions"));
        const trID = getTrans.length + 1;
        const saveTransaction = {
          transNo : trID,
          BankAmnt:accntBal,
          amount:parseInt(inputAmount),
          action:"Deposit",
          accountNo:currentUser.Accntno,
          username:currentUser.username,
          Description:desc,
          sendToaccntNo:'',
          sendToAccntName:'',
          date: dateNow,
          Remarks: remarks,
          currentBalance: parseInt(inputAmount) + accntBal
        }
        // setbanktrans(oldbankArr => [...oldbankArr,saveTransaction]);
        bankTrans.push(saveTransaction);
        localStorage.setItem("bankTransactions", JSON.stringify(bankTrans));
      }else{
        const trID = 1;
        const saveTransaction = {
          transNo : trID,
          BankAmnt:accntBal,
          amount:parseInt(inputAmount),
          action:"Deposit",
          accountNo:currentUser.Accntno,
          username:currentUser.username,
          Description:desc,
          sendToaccntNo:'',
          sendToAccntName:'',
          date: dateNow,
          Remarks: remarks,
          currentBalance: parseInt(inputAmount) + accntBal
        }
        bankTrans.push(saveTransaction);
        localStorage.setItem("bankTransactions", JSON.stringify(bankTrans));

        // setbanktrans(oldbankArr => [...oldbankArr,saveTransaction]);
        // localStorage.setItem("bankTransactions", JSON.stringify(saveTransaction));
      }
    }
        setshowDepo(false);
    }

    //send Money

    const handleCloseSendMoney = () => setshowSendMoney(false);
    const handleShowSendMoney = () => setshowSendMoney(true);
    const [SMAccntno,setSMAccntNo] = useState('');
    const [accntName,setSMAccntName] = useState('');
    const [showSendMoney, setshowSendMoney] = useState(false);

    const handleSendMoney = (e) => {
      e.preventDefault();
      if(confirm("Are you sure, you want to continue this transaction?")){

      let getAccnt = JSON.parse(localStorage.getItem('accounts'));
      let currentUser = JSON.parse(localStorage.getItem('LoginUser'));
      let SMaccntExists = false;
      let SMAReceiverBal = 0;
      for(let i=0;i<getAccnt.length;i++){
        if(SMAccntno === getAccnt[i].Accntno && accntName === getAccnt[i].fullname){
          const amnt = getAccnt[i].balance + parseInt(inputAmount);
          getAccnt[i].balance += parseInt(inputAmount);
          SMaccntExists = true;
          SMAReceiverBal = getAccnt[i].balance - parseInt(inputAmount);
          console.log(SMAReceiverBal);
          
        }
      }
      localStorage.setItem('accounts', JSON.stringify(getAccnt))
      if(SMaccntExists){
        for(let x=0;x<getAccnt.length;x++){
          if(getAccnt[x].Accntno === currentUser.Accntno){
            console.log('test');
            getAccnt[x].balance = getAccnt[x].balance - parseInt(inputAmount);
            setAccntBal(getAccnt[x].balance);
          }
        }
      }
      localStorage.setItem('accounts', JSON.stringify(getAccnt));
      // const updateAccnts = localStorage.setItem('accounts', JSON.stringify(getReceiverAccnt));


      if(localStorage.getItem("bankTransactions")){
        const getTrans = JSON.parse(localStorage.getItem("bankTransactions"));
        const trID = getTrans.length + 1;
        const saveTransaction = {
          transNo : trID,
          BankAmnt:accntBal,
          amount:parseInt(inputAmount),
          action:"Transfer/Send",
          accountNo:currentUser.Accntno,
          fromAccnt:currentUser.Accntno,
          username:currentUser.username,
          Description:desc,
          sendToaccntNo:SMAccntno,
          sendToAccntName:accntName,
          date: dateNow,
          Remarks: remarks,
          currentBalance: accntBal - parseInt(inputAmount) 
        }

        const saveTransactionReceiver = {
          transNo : trID + 1,
          BankAmnt:SMAReceiverBal,
          amount:parseInt(inputAmount),
          action:"Transfer/Send",
          accountNo:SMAccntno,
          fromAccnt:currentUser.Accntno,
          username:currentUser.username,
          Description:desc,
          sendToaccntNo:SMAccntno,
          sendToAccntName:accntName,
          date: dateNow,
          Remarks: remarks,
          currentBalance: SMAReceiverBal + parseInt(inputAmount)
          // console.log();
        }
        // setbanktrans(oldbankArr => [...oldbankArr,saveTransaction]);
        bankTrans.push(saveTransaction);
        bankTrans.push(saveTransactionReceiver);
        localStorage.setItem("bankTransactions", JSON.stringify(bankTrans));
      }else{
        const trID = 1;
        const saveTransaction = {
          transNo : trID,
          BankAmnt:accntBal ,
          amount:parseInt(inputAmount),
          action:"Transfer/Send",
          accountNo:currentUser.Accntno,
          username:currentUser.username,
          Description:desc,
          sendToaccntNo:SMAccntno,
          sendToAccntName:accntName,
          date: dateNow,
          Remarks: remarks,
          currentBalance: accntBal - parseInt(inputAmount)
        }

        const saveTransactionReceiver = {
          transNo : trID +1,
          BankAmnt:SMAReceiverBal - parseInt(inputAmount),
          amount:parseInt(inputAmount),
          action:"Transfer/Send",
          accountNo:currentUser.Accntno,
          username:currentUser.username,
          Description:desc,
          sendToaccntNo:SMAccntno,
          sendToAccntName:accntName,
          date: dateNow,
          Remarks: remarks,
          currentBalance: SMAReceiverBal + parseInt(inputAmount)
        }
        bankTrans.push(saveTransaction);
        bankTrans.push(saveTransactionReceiver);
        localStorage.setItem("bankTransactions", JSON.stringify(bankTrans));
      }
    }
      setshowSendMoney(false);
    }

    let tblerows = null;
    if(bankTrans){
      tblerows=<tbody >
      {
        bankTrans.map((x,i)=>{
          if(x.accountNo === loginUser.Accntno ){
            return (
              <tr key={i}>
                <td >{x.transNo}</td>
                <td >{x.date}</td>
                <td >{x.fromAccnt}</td>
                <td >{x.BankAmnt}</td>
                <td >{x.amount}</td>
                <td >{x.action}</td>
                <td >{x.sendToAccntName}</td>
                <td >{x.currentBalance}</td>
                <td >{x.Remarks}</td>
              </tr>
            );
          }
        })
      }
      </tbody>
      
    }

  return (
    <>    
    <h4> Welcome to Dashboard  {loginUser.username.toUpperCase() }  </h4>
    <div className="accountbal-container">
      <div className='row'>
      <h4> Available Balance  </h4>
      
      <h5>₱ {accntBal.toLocaleString(undefined, {maximumFractionDigits:2})}</h5>
        <div>
          <small>Savings Account No:  {loginUser.Accntno}</small>
        </div>
        <div>
          <small> BANKO APP - Savings  </small>
        </div>
      </div>

      <div className='row'>
        </div>
    </div>

    <div className="bankbtn-container">
      <button className='btn btn-dark dash-btn' onClick={handleShowDeposit}>
      <FontAwesomeIcon icon={faMoneyBillTrendUp} className='iconSize'  size="2xl" />
      <p>Deposit</p>
      </button>

      <button className='btn btn-dark dash-btn'onClick={handleShowSendMoney}>
      <FontAwesomeIcon icon={faMoneyBillTransfer} size="2xl" />
      <p>Send Money</p>
      </button>

      <Button variant="dark" className='dash-btn' onClick={handleShowWidthdraw}>
      <FontAwesomeIcon icon={faHandHoldingDollar} size="2xl" />
      <p>Withdraw</p>
      </Button>
    </div>

    <Modal show={showwidth} onHide={handleCloseWidthdraw}>
      <Modal.Header closeButton>
        <Modal.Title>Withdraw</Modal.Title>
      </Modal.Header>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className=''><label>Account No :</label></th>
            <th><input type="text" placeholder='' value={loginUser.Accntno ? loginUser.Accntno: '' } disabled/></th>
          </tr>
          <tr>
            <th><label>Amount :</label></th>
            <th><input type="number" onChange={(e)=> setInputAmnt(e.target.value)} placeholder='Enter Amount' required/></th>
          </tr>
          <tr>
            <th><label>Remarks :</label></th>
            <th><input type="text" onChange={(e)=> setRemarks(e.target.value)} placeholder='Remarks' /></th>
          </tr>
        </thead>
      </Table>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseWidthdraw}>
          Close
        </Button>
        <Button variant="primary" onClick={handleWidthdraw}>
          Widthdraw
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showDepo} onHide={handleCloseDepo}>
      <Modal.Header closeButton>
        <Modal.Title>Deposit</Modal.Title>
      </Modal.Header>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th className=''><label>Account No :</label></th>
          <th><input type="text" placeholder='' value={loginUser.Accntno ? loginUser.Accntno: '' } disabled/></th>
        </tr>
        <tr>
          <th><label>Enter Amount: </label></th>
          <th><input type="number" onChange={(e)=> setInputAmnt(e.target.value)} required/></th>
        </tr>
        <tr>
          <th><label>Description: </label></th>
          <th><input type="text" onChange={(e)=> setRemarks(e.target.value)} /></th>
        </tr>
      </thead>
    </Table>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDepo}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDepo}>
          Deposit
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showSendMoney} onHide={handleCloseSendMoney}>
      <Modal.Header closeButton>
        <Modal.Title>Send Money</Modal.Title>
      </Modal.Header>


      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th className=''><label> Account Number:</label></th>
          <th><input type="text" onChange={(e)=> setSMAccntNo(e.target.value)} required/></th>
        </tr>
        <tr>
          <th><label> Account Name:</label></th>
          <th><input type="text" onChange={(e)=> setSMAccntName(e.target.value)} required/></th>
        </tr>
        <tr>
          <th> <label> Amount   :</label></th>
          <th><input type="number" onChange={(e)=> setInputAmnt(e.target.value)} required/></th>
        </tr>
        <tr>
          <th> <label> Remarks   :</label></th>
          <th><input type="text" onChange={(e)=> setRemarks(e.target.value)} /></th>
        </tr>
      </thead>
    </Table>



     

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSendMoney}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendMoney}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>




  <h3>Transaction History</h3>

  <Container>
  <Row>
    <Col></Col>
    <Col>
    
    <div className='tableContainer'>
      <Table responsive striped bordered hover size="sm" >
        <thead className='theadcontainer'>
          <tr >
            <th>TransNo</th>
            <th>Date</th>
            <th>From Account</th>
            <th>Prev. Bank Bal.</th>
            <th>Amount</th>
            <th>Action</th>
            <th>Receiver</th>
            <th>Balance</th>
            <th>Remarks</th>
          </tr>
        </thead>
          {tblerows}
      </Table>
      </div>


    
    
    
    
    
    </Col>
    <Col></Col>
  </Row>
</Container>
  

 

    </>

  )
}

export default Dashboard
