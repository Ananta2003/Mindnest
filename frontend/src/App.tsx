import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/Dashboard'
import { Signin } from './pages/Sginin'
import { Signup } from './pages/Signup'

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/' element={<Signup/>} />
    </Routes>

    </BrowserRouter>
  )
}

export default App
