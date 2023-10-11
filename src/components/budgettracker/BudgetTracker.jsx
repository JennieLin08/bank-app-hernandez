import React , {useEffect, useState} from 'react'
import './budgettracker.css';
import { Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const BudgetTracker = () => {
  const [price, setPrice] = useState(0);
  const [qty, setqty] = useState(1);
  const [inputDesc, setDesc] = useState('');
  const [expenseTrans, setExpensetrans] = useState([]);
  const [bankTrans, setbanktrans] = useState([]);

      const [editProduct, setEditProduct] = useState('');
      const [editPrice, setEditPrice] = useState(0);
      const [editQty, setEditQty] = useState(0);
      const [editTotal, setEditTotal] = useState(0);
      const [editAccountno , setEditAccntno] = useState("");
      const [editBankAmnt , setEditBankAmnt] = useState(0);
      const [editTransNo , setEditTransNo] = useState(0);
      const [transNoid, settransNoid ] = useState(0);
  
    useEffect(()=>{
        if(!localStorage.getItem("expenseTrans")){
          localStorage.setItem("expenseTrans", JSON.stringify(expenseTrans));
        }else{
          const getExpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
          setExpensetrans(getExpenseTrans);
        }
        if(localStorage.getItem('bankTransactions')){
          const getbanktrans = localStorage.getItem('bankTransactions');
          const parsedgetbanktrans = JSON.parse(localStorage.getItem('bankTransactions'));
          setbanktrans(parsedgetbanktrans);
          // console.log(bankTrans);
        }else{
          localStorage.setItem('bankTransactions', JSON.stringify(bankTrans));
        }
        setTotal(price*qty);
        setEditTotal(editPrice*editQty);
      },[price,qty,editPrice,editQty]);

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

      //add expense code
      const handleCloseExpense = () => setshowExpense(false);
      const handleShowExpense = () => {
        setshowExpense(true);
        setTotal(0);
      };
      const [showExpense, setshowExpense] = useState(()=>{
        setqty(1);
        return false;
      });
      const dateNow = new Date().toLocaleString();
      const [total, setTotal]= useState(0);

      const onChangePrice = (e)=> {
        e.preventDefault();
        setPrice(e.target.value);          
      }

      const handleAddExpense = (e)=>{
        e.preventDefault();
        if(price > accntBal && price > 0){
          alert("Check your Balance!");
        }else{
          const getExpTrans = localStorage.getItem("expenseTrans");
          const parseExpTrans = JSON.parse(getExpTrans);
          const transID = parseExpTrans.length + 1;
          const saveExpenseTransaction = {
            transNo : transID,
            Accntno : loginUser.Accntno,
            BankAmnt:accntBal,
            Description:inputDesc,
            amount:parseInt(price),
            action:"expense",
            qty:parseInt(qty),
            date: dateNow,
            currentBalance: accntBal - parseInt(price),
            status:'pending',
            total: parseInt(price) * parseInt(qty)
          }
          expenseTrans.push(saveExpenseTransaction);
          localStorage.setItem("expenseTrans", JSON.stringify(expenseTrans));
        }
        const getExpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
          setExpensetrans(getExpenseTrans);
        setshowExpense(false);
      }

      const handleDelExpense = (e)=>{
        e.preventDefault();
        console.log(parseInt(e.target.id));
        let getExpenseTrans =JSON.parse(localStorage.getItem("expenseTrans"));
        for(let i=0;i<getExpenseTrans.length;i++){
          if(parseInt(e.target.id) === getExpenseTrans[i].transNo){
            getExpenseTrans[i].status = "del";
          }
        }
        localStorage.setItem('expenseTrans', JSON.stringify(getExpenseTrans))
        const xpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
        setExpensetrans(getExpenseTrans);
      }

      //edit expense
      const handleCloseEditExpense = () => setshowEditExpense(false);
      const handleShowEditExpense = () => {
        setshowEditExpense(true);
        setTotal(0);
      };
      const [showEditExpense, setshowEditExpense] = useState(false);
      const onChangeEditPrice = (e)=> {
        e.preventDefault();
        setEditPrice(e.target.value);          
      }
      const handleSaveEditExpense = (e)=>{
        
        e.preventDefault();
        const getXpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
        const dateNow = new Date().toLocaleString();
        for(let i =0;i<getXpenseTrans.length;i++){
          if(getXpenseTrans[i].transNo === editTransNo){
            getXpenseTrans[i].transNo= editTransNo;
            getXpenseTrans[i].BankAmnt = editBankAmnt;
            getXpenseTrans[i].Description = editProduct;
            getXpenseTrans[i].amount = editPrice;
            getXpenseTrans[i].currentBalance= editBankAmnt - editPrice;
            getXpenseTrans[i].date = dateNow;
            getXpenseTrans[i].qty = parseInt(editQty);
            getXpenseTrans[i].total = editTotal;
          }
        }
       
        localStorage.setItem('expenseTrans', JSON.stringify(getXpenseTrans));
        setExpensetrans(getXpenseTrans);
        setshowEditExpense(false);
      }
      const handleApprovedExpense = (e) => {
        e.preventDefault();

        const getXpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
        const dateNow = new Date().toLocaleString();
        let getaccntno = "";
        let expamnt = 0;
        let desc = "";
        for(let i =0;i<getXpenseTrans.length;i++){
          if(getXpenseTrans[i].transNo === parseInt(e.target.id)){
            getXpenseTrans[i].status = "Approved";
            getaccntno = getXpenseTrans[i].Accntno;
            expamnt = getXpenseTrans[i].total;
            desc = getXpenseTrans[i].Description;
          }
        }
        localStorage.setItem('expenseTrans', JSON.stringify(getXpenseTrans));

        let userAccnt = JSON.parse(localStorage.getItem('accounts'));
        let currentUser = JSON.parse(localStorage.getItem('LoginUser'));
        for(let i=0;i<userAccnt.length;i++){
          if(currentUser.id === userAccnt[i].id ){
            userAccnt[i].balance = userAccnt[i].balance - expamnt;
            currentUser.balance = userAccnt[i].balance - expamnt;
          }
        }
        localStorage.setItem('accounts', JSON.stringify(userAccnt));
        localStorage.setItem('LoginUser', JSON.stringify(currentUser));

        if(localStorage.getItem("bankTransactions")){
          const getTrans = JSON.parse(localStorage.getItem("bankTransactions"));
          const trID = getTrans.length + 1;
          const saveTransaction = {
            transNo : trID,
            BankAmnt:accntBal,
            amount:expamnt,
            action:"Expense",
            accountNo:currentUser.Accntno,
            username:currentUser.username,
            Description:desc,
            sendToaccntNo:'',
            sendToAccntName:'',
            date: dateNow,
            Remarks: desc,
            currentBalance: accntBal - expamnt
          }
          bankTrans.push(saveTransaction);
          localStorage.setItem("bankTransactions", JSON.stringify(bankTrans));
        }else{
          const trID = 1;
          const saveTransaction = {
            transNo : trID,
            BankAmnt:accntBal,
            amount:expamnt,
            action:"Expense",
            accountNo:currentUser.Accntno,
            username:currentUser.username,
            Description:desc,
            sendToaccntNo:'',
            sendToAccntName:'',
            date: dateNow,
            Remarks: desc,
            currentBalance: accntBal - expamnt
          }
          bankTrans.push(saveTransaction);
          localStorage.setItem("bankTransactions", JSON.stringify(bankTrans));
        }
        window. location. reload();
      }
    let tblerows = null;
    let totalExp = 0;
    if(expenseTrans){
      tblerows=<tbody>
      {
        expenseTrans.map((x,i)=>{
          if(x.Accntno === loginUser.Accntno && x.status === "pending"){
            totalExp +=x.total;
            return (
              <tr key={i}>
                <td >{x.transNo}</td>
                <td >{x.date}</td>
                <td >{x.Description}</td>
                <td >{x.amount}</td>
                <td >{x.qty}</td>
                <td > ₱ {x.total}</td>
                <td >
                  <button className='btn btn-danger ' onClick={(e)=>{
                    let getExpenseTrans =JSON.parse(localStorage.getItem("expenseTrans"));
                    for(let i=0;i<getExpenseTrans.length;i++){
                      if(parseInt(x.transNo) === getExpenseTrans[i].transNo){
                        getExpenseTrans[i].status = "del";
                      }
                    }    
                    localStorage.setItem('expenseTrans', JSON.stringify(getExpenseTrans));   
                    setExpensetrans(getExpenseTrans);   
                  }} id={x.transNo}><FontAwesomeIcon icon={faTrash} /></button>

                  <button className='btn btn-primary m-2' onClick={(e)=>{
                    const xpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
                    for(let i=0;i<xpenseTrans.length ;i++){
                     if(parseInt(xpenseTrans[i].transNo) === parseInt(x.transNo)){
                       setEditProduct(xpenseTrans[i].Description);
                       setEditPrice(xpenseTrans[i].amount);
                       setEditQty(xpenseTrans[i].qty);
                       setEditAccntno(xpenseTrans[i].Accntno);
                       setEditBankAmnt(xpenseTrans[i].BankAmnt);
                       setEditTransNo(xpenseTrans[i].transNo);
                     }
                   }
                   setshowEditExpense(true);
                  }}  id={x.transNo} ><FontAwesomeIcon icon={faPenToSquare} /></button>
                  <button className='btn btn-success ' id={x.transNo} onClick={handleApprovedExpense}>Approve</button>
                </td>
              </tr>
            );
          }
        })
      }
      <tr>
      <th scope="row"> </th>
      <td colSpan="4">Total Expenses:</td>
      <td>₱ {totalExp}</td>
      <td></td>
    </tr>
</tbody>
    }
  return (
    <>
      <h1> Welcome to Budget Tracker</h1>
      <div className="accountbal-expense-container">
        <div className='row'>
          <h4> Account Balance  </h4>
          <h5>₱ {(accntBal - totalExp).toLocaleString()}</h5>
        </div>
      </div>
      <div className="bankbtn-container">
      <button className='btn btn-dark' onClick={handleShowExpense}>Add Expense</button>
    </div>
    <h3>Expense Record</h3>
    <Table striped bordered hover size="sm" className='tblbt'>
      <thead >
        <tr >
          <th>TransNo</th>
          <th>Date</th>
          <th>Product/Desc</th>
          <th>Amount</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
        {tblerows} 
    </Table>
    <Modal show={showExpense} onHide={handleCloseExpense}>
    <Modal.Header closeButton>
      <Modal.Title>Add Expense</Modal.Title>
    </Modal.Header>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th className=''><label>Product/Description :</label></th>
          <th><input type="text" onChange={(e)=> setDesc(e.target.value)} placeholder='Description' required/></th>
        </tr>
        <tr>
          <th> <label>Price :</label></th>
          <th><input type="number" onChange={onChangePrice} placeholder='Enter Amount' required/></th>
        </tr>
        <tr>
          <th> <label>Quantity :</label></th>
          <th><input type="number" value={qty} onChange={(e)=> setqty(e.target.value)} placeholder='Enter Amount' required/></th>
        </tr>
        <tr>
          <th> <label>Total :</label> </th>
          <th>  <h5>₱  {total}</h5> </th>
        </tr>
      </thead>
    </Table>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseExpense}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAddExpense}>
        Add
      </Button>
    </Modal.Footer>
  </Modal>
  
  <Modal show={showEditExpense} onHide={handleCloseEditExpense}>
    <Modal.Header closeButton>
      <Modal.Title>Add Expense</Modal.Title>
    </Modal.Header>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th className=''><label>Product/Description :</label></th>
          <th><input type="text" value={editProduct} onChange={(e)=> setEditProduct(e.target.value)} placeholder='Description' required/></th>
        </tr>
        <tr>
          <th><label>Price :</label></th>
          <th><input type="number"  value={editPrice} onChange={onChangeEditPrice} placeholder='Enter Amount' required/></th>
        </tr>
        <tr>
          <th> <label>Quantity :</label></th>
          <th><input type="number" value={editQty} onChange={(e)=> setEditQty(e.target.value)} placeholder='Enter Amount' required/></th>
        </tr>
        <tr>
          <th> <label>Total :</label> </th>
          <th>  <h5>₱  {editTotal}</h5> </th>
        </tr>
      </thead>
    </Table>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseEditExpense}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSaveEditExpense}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>

    </>
  )
}

export default BudgetTracker
