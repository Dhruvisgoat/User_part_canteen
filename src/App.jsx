import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import { CartProvider } from './Context/CartContext'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import Login from './pages/LoginPage/Login'
import Register from './pages/RegisterPage/Register'
import ForgotPassword from './pages/ForgotPasswordPage/ForgotPassword'
import {useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import DeliverySection from './pages/Delivery/Delivery'


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (isLoading) {
        return (
            <div className="pt-3 text-center">
                <div className="sk-spinner sk-spinner-pulse">Loading...</div>
            </div>
        )
    }

    return (
        <CartProvider>
            <Router>
                <Routes>
                {isAuthenticated ? <Route path="/" element={<Navigate to="/home" />} /> : <Route path="/" element={<Login />} />}
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    {/* for going depper into the paths of home we need to add a /*  */}
                    <Route path="/home/*" element={<Home />}></Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </CartProvider>
    )
}

export default App