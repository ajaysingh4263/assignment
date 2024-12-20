import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import { getCategories, getProductsByCategory } from '../services/Api.js';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { category } = useParams(); // Get the category from the URL params
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (category) {
            handleCategoryClick(category); // Fetch products if category is in URL
        }
    }, [category]);

    const handleCategoryClick = async (selectedCategory) => {
        navigate(`/category/${selectedCategory}`); // Update URL with the category
        setLoading(true);
        const products = await getProductsByCategory(selectedCategory);
        setProducts(products);
        setLoading(false);
    };

    const handleCardClick = (id) => {
        navigate(`/product/${id}`); // Navigate to ProductDetails with the product ID
    };

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <h2>Categories</h2>
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        variant="contained"
                        onClick={() => handleCategoryClick(cat)}
                        style={{ margin: '0.5rem' }}
                    >
                        {cat}
                    </Button>
                ))}
            </div>
            <div>
                <h2>Products</h2>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card
                                    sx={{
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                                        },
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleCardClick(product.id)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image}
                                        alt={product.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {product.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: ${product.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>
        </div>
    );
};

export default Home;
