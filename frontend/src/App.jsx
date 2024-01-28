import { useState } from 'react'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Employee from './components/Employee';
import Department from './components/Department';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/department" element={<Department />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
