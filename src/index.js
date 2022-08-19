import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Phoshto from './components/Phoshto';
import FullGossip from './components/FullGossip';
import ServiceAndAccomodation from './components/ServiceAndAccomodation';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { AdminProducts } from './components/AdminProducts';
import { AdminGossips } from './components/AdminGossips';
import { UpdateGossip } from './components/UpdateGossip';
import AdminEvents from './components/AdminEvents';
import { AdminAccomodation } from './components/AdminAccomodation';
import Orders from './components/Orders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="products" element={<Products />}/>
      <Route path="/phoshto" element={<Phoshto />}/>
      <Route path="/phoshto/:gossip" element={<FullGossip/>}/>
      <Route path="/services" element={<ServiceAndAccomodation />}/>
      <Route path="admins/login" element={<AdminLogin />}/>
      <Route path="admins/dashboard" element={<AdminDashboard />}/>
      <Route path="admins/products" element={<AdminProducts />}/>
      <Route path="admins/accomodations" element={<AdminAccomodation />}/>
      <Route path="admins/events" element={<AdminEvents />}/>
      <Route path="admins/orders" element={<Orders />}/>
      <Route path="admins/gossips" element={<AdminGossips />}/>
      <Route path="admins/gossips/update-gossip/:gossip" element={<UpdateGossip/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

