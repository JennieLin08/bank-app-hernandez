import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm'
import './App.css'
// import LoginForm from './components/LoginForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginForm />
    </>
  )
}

export default App
