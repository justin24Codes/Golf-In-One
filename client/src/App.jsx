import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import GolfBackground from './images/GolfHole.jpg'
import Navbar from './components/Navbar.jsx'
import './App.css'

function App() {

  return (
    <main className=''>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
    </main>
  )
}

export default App
