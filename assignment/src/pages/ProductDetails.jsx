// src/components/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from "../context/Cartcontext.jsx";
import { getProductById } from '../services/Api';
import { Card, CardContent, CardMedia, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Accessing addToCart from CartContext
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

    useEffect(() => {
        const fetchProductDetails = async () => {
            const data = await getProductById(id);
            setProduct(data);
            setLoading(false);
        };
        fetchProductDetails();
    }, [id]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setSnackbarOpen(true); // Open Snackbar
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false); // Close Snackbar
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
            </div>
        );
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.image}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginTop: '1rem' }}>
                        {product.description}
                    </Typography>
                </CardContent>
            </Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>

            {/* Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Automatically hide after 3 seconds
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Product added to cart successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductDetails;
