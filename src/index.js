// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Navbar from './components/Layout/navbar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Router>
   <div>
      <Navbar />
      <Routes>
         <Route path="/" exact Component={App} />
      </Routes>
   </div>
 </Router>
);