import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header';
import { CartProvider } from './context/Cartcontext.jsx';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Router>
            <CartProvider >
             <Header onSearch={setSearchTerm} />
            <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />

            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            </CartProvider>
        </Router>
    );
};

export default App;
