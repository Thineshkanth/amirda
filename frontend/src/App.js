import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import AdminDashboard from './Components/AdminDashboard';
import ManageUsers from './Components/ManageUser';
import AdminHeader from './Components/AdminHeader';
import Admin from './ManageUI.js/Admin';
import ProductOwner from './ManageUI.js/ProductOwner';
import Customer from './ManageUI.js/Customer';
import ProtectedRoute from './Config/ProtectedRoute ';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/adminDashboard" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/viewUsers" 
                    element={
                        <ProtectedRoute>
                            <ManageUsers />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/adminheader" 
                    element={
                        <ProtectedRoute>
                            <AdminHeader />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/productOwner" 
                    element={
                        <ProtectedRoute>
                            <ProductOwner />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/customer" 
                    element={
                        <ProtectedRoute>
                            <Customer />
                        </ProtectedRoute>
                    } 
                />
                
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
