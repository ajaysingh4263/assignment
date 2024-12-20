import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
};

export const getProductsByCategory = async (category) => {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
};
