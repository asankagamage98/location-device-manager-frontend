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
import DeviceEditForm from './components/forms/DeviceEditForm.jsx';
import ExistingLocations from './pages/ExistingLocations.jsx';
import LocationEditForm from './components/forms/LocationEditForm.jsx';

export default function App() {
  return (
    <div className="bg-pattern min-h-screen">
    <NavBar/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/device" element={<DeviceCreate/>} />
        <Route path="/location" element={<LocationCreate/>} />
        <Route path="/editDevice/:id" element={<DeviceEditForm/>} />
        <Route path="/viewLocations" element={<ExistingLocations/>} />
        <Route path="/editLocation/:id" element={<LocationEditForm/>} /> 
    </Routes>
    </div>
  )
}
