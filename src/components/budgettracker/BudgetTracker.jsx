import React , {useEffect, useState} from 'react'
import './budgettracker.css';
import { Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const BudgetTracker = () => {
  const [price, setPrice] = useState(0);
  const [qty, setqty] = useState(1);
  const [inputDesc, setDesc] = useState('');
  const [expenseTrans, setExpensetrans] = useState([]);

      const [editProduct, setEditProduct] = useState('');
      const [editPrice, setEditPrice] = useState(0);
      const [editQty, setEditQty] = useState(0);
      const [editTotal, setEditTotal] = useState(0);
      const [editAccountno , setEditAccntno] = useState("");
      const [editBankAmnt , setEditBankAmnt] = useState(0);
      const [editTransNo , setEditTransNo] = useState(0);
  

    useEffect(()=>{
        if(!localStorage.getItem("expenseTrans")){
          localStorage.setItem("expenseTrans", JSON.stringify(expenseTrans));
        }else{
          const getExpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
          setExpensetrans(getExpenseTrans);
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
      const [showExpense, setshowExpense] = useState(false);
      const dateNow = new Date().toLocaleString();
      const [total, setTotal]= useState(0);

      const onChangePrice = (e)=> {
        e.preventDefault();
        setPrice(e.target.value);          
      }

      const handleAddExpense = (e)=>{
        e.preventDefault();
        // console.log(parseInt(inputAmnt));
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
        setshowExpense(false);
      }

      const handleDelExpense = (e)=>{
        e.preventDefault();
        let getExpenseTrans =JSON.parse(localStorage.getItem("expenseTrans"));
        for(let i=0;i<getExpenseTrans.length;i++){
          console.log(parseInt(e.target.id));
          console.log(getExpenseTrans[i].transNo);
          if(parseInt(e.target.id) === getExpenseTrans[i].transNo){
            console.log('amnt');
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

      //edit expense code

      const handleEditExpense = (e)=>{
        e.preventDefault();
        const xpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
         for(let i=0;i<xpenseTrans.length ;i++){
          if(parseInt(xpenseTrans[i].transNo) === parseInt(e.target.id)){
            setEditProduct(xpenseTrans[i].Description);
            setEditPrice(xpenseTrans[i].amount);
            setEditQty(xpenseTrans[i].qty);
            setEditAccntno(xpenseTrans[i].Accntno);
            setEditBankAmnt(xpenseTrans[i].BankAmnt);
            setEditTransNo(xpenseTrans[i].transNo);
          }
        }
        setshowEditExpense(true);
      }
      const onChangeEditPrice = (e)=> {
        e.preventDefault();
        setEditPrice(e.target.value);          
      }

      // const [editProduct, setEditProduct] = useState('');
      // const [editPrice, setEditPrice] = useState(0);
      // const [editQty, setEditQty] = useState(0);
      // const [editTotal, setEditTotal] = useState(0);
      // const [editAccountno , setEditAccntno] = useState("");
      // const [editBankAmnt , setEditBankAmnt] = useState(0);
      // const [editTransNo , setEditTransNo] = useState(0);

      const handleAddEditExpense = (e)=>{
        e.preventDefault();
        const getXpenseTrans = JSON.parse(localStorage.getItem("expenseTrans"));
        const dateNow = new Date().toLocaleString();
        for(let i =0;i<getXpenseTrans.length;i++){
          if(getXpenseTrans[i].transNo === editTransNo){
            getXpenseTrans[i].transNo = editTransNo;
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
        setshowEditExpense(false);
      }

      const handleApprovedExpense = (e) => {
        e.preventDefault();
        alert('approved!');
      }


    let tblerows = null;
    if(expenseTrans){
      tblerows=<tbody>
      {
        expenseTrans.map((x,i)=>{
          if(x.Accntno === loginUser.Accntno && x.status !== "del"){
            return (
              <tr key={i}>
                <td >{x.transNo}</td>
                <td >{x.date}</td>
                <td >{x.Description}</td>
                <td >{x.amount}</td>
                <td >{x.qty}</td>
                <td >{x.total}</td>
                <td >
                  <button className='btn btn-warning ' onClick={handleDelExpense} id={x.transNo}>Del</button>
                  <button className='btn btn-primary m-2' onClick={handleEditExpense} id={x.transNo}>Edit</button>
                  <button className='btn btn-primary ' id={x.transNo} onClick={handleApprovedExpense}>Approved</button>
                </td>
              </tr>
            );
          }
        })
      }
      </tbody>
    }

   

    
  return (
    <>
      <h1> Welcome to Budget Tracker</h1>
      <div className="accountbal-container">
        <div className='row'>
          <h4> Account Balance  </h4>
          <h5>₱ {accntBal.toLocaleString(undefined, {maximumFractionDigits:2})}</h5>
        </div>
       
      </div>
      <div className="bankbtn-container">
      <button className='btn btn-dark' onClick={handleShowExpense}>Add Expense</button>
    </div>

    <h3>Expense Record</h3>

    <Table striped bordered hover size="sm">
      <thead>
        <tr>
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



//modals
    <Modal show={showExpense} onHide={handleCloseExpense}>
    <Modal.Header closeButton>
      <Modal.Title>Add Expense</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <label>Product/Description :</label><input type="text" onChange={(e)=> setDesc(e.target.value)} placeholder='Description' required/>
    </Modal.Body>
    <Modal.Body>
      <label>Price :</label><input type="number" onChange={onChangePrice} placeholder='Enter Amount' required/>
    </Modal.Body>
    <Modal.Body>
      <label>Quantity :</label><input type="number" value={qty} onChange={(e)=> setqty(e.target.value)} placeholder='Enter Amount' required/>
    </Modal.Body>

    <Modal.Body>
      <label>Total :</label><h5>₱  {total}</h5>
    </Modal.Body>
    
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
    <Modal.Body>
      <label>Product/Description :</label><input type="text" value={editProduct} onChange={(e)=> setEditProduct(e.target.value)} placeholder='Description' required/>
    </Modal.Body>
    <Modal.Body>
      <label>Price :</label><input type="number"  value={editPrice} onChange={onChangeEditPrice} placeholder='Enter Amount' required/>
    </Modal.Body>
    <Modal.Body>
      <label>Quantity :</label><input type="number" value={editQty} onChange={(e)=> setEditQty(e.target.value)} placeholder='Enter Amount' required/>
    </Modal.Body>

    <Modal.Body>
      <label>Total :</label><h5>₱  {editTotal}</h5>
    </Modal.Body>
    
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseEditExpense}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAddEditExpense}>
        Add
      </Button>
    </Modal.Footer>
  </Modal>

    </>
  )
}

export default BudgetTracker
