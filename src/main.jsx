import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import PetDetails from '../Components/PetDetails'
import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <Routes>
        <Route index={true} exact path="/" element={<App />} />
        <Route index={true} exact path="/Pet/:id" element={<PetDetails />} />
    </Routes>
  </BrowserRouter>
)
