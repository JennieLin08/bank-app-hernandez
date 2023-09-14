import React from 'react'
import './dashboard.css';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LoginForm from '../LoginForm';

const Dashboard = (props) => {
    const user = props.user;
    console.log(user.username)

  return (
    <>    
    <div>
    welcome {user.username}
    <Card style={{ width: '18rem'}}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
    </div>

    </>

  )
}

export default Dashboard
