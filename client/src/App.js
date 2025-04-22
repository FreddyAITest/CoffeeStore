import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import OwnerRoute from './components/routing/OwnerRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StoreList from './pages/StoreList';
import StoreDetails from './pages/StoreDetails';
import BookingForm from './pages/BookingForm';
import Dashboard from './pages/Dashboard';
import StoreForm from './pages/StoreForm';
import TableForm from './pages/TableForm';
import BookingManagement from './pages/BookingManagement';
import NotFound from './pages/NotFound';

// Context
import AuthState from './context/auth/AuthState';

const App = () => {
  return (
    <AuthState>
      <Header />
      <div className="container main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/stores/:id" element={<StoreDetails />} />
          <Route path="/booking/:storeId/:tableId" element={<BookingForm />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/bookings" element={<PrivateRoute><BookingManagement /></PrivateRoute>} />
          
          {/* Owner Routes */}
          <Route path="/stores/create" element={<OwnerRoute><StoreForm /></OwnerRoute>} />
          <Route path="/stores/edit/:id" element={<OwnerRoute><StoreForm /></OwnerRoute>} />
          <Route path="/tables/create/:storeId" element={<OwnerRoute><TableForm /></OwnerRoute>} />
          <Route path="/tables/edit/:id" element={<OwnerRoute><TableForm /></OwnerRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" />
    </AuthState>
  );
};

export default App;