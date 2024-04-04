import React from 'react'
import NavBar from './components/navbar/NavBar'
import Home from './pages/Home.jsx'
import './index.css';

import {
  Route,
  Routes,
} from 'react-router-dom';
import DeviceCreate from './pages/DeviceCreate.jsx';
import LocationCreate from './pages/LocationCreate.jsx';

export default function App() {
  return (
    <div className="bg-pattern min-h-screen">
    <NavBar/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/device" element={<DeviceCreate/>} />
        <Route path="/location" element={<LocationCreate/>} />
    </Routes>
    </div>
  )
}
