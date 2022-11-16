import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './Intro'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div
      className="god-box"
    >

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path='/One' element={<StepOne />} />
          <Route path='/two' element={<StepTwo />} />
          <Route path='*' element={(<a href="/">Start</a>)} />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
)
