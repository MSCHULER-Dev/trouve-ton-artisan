import axios from 'axios';

const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://trouve-ton-artisan-vhxj.onrender.com/api';

export default {
    async getArtisans(params = {}) {
        const response = await axios.get(`${API_URL}/artisans`, { params });
        return response.data;
    },
    async getArtisanById(id) {
        const response = await axios.get(`${API_URL}/artisans/${id}`);
        return response.data;
    },
    async getCategories() {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    },
    async getSpecialistes() {
        const response = await axios.get(`${API_URL}/specialistes`);
        return response.data;
    },
    async sendMessage(contactData) {
        const response = await axios.post(`${API_URL}/contact`, contactData);
        return response.data;
    }
};
