import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', // Your backend URL
});

// Interceptor to add the token to every request if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Jailer Routes
export const jailerLogin = (formData) => API.post('/jailer/login', formData);
export const jailerSignUp = (formData) => API.post('/jailer/signup', formData);

// Criminal Routes
export const getCriminals = () => API.get('/criminal/get');
export const createCriminal = (criminalData) => API.post('/criminal/create', criminalData);
export const deleteCriminal = (id) => API.delete(`/criminal/delete/${id}`);
export const updateCriminal = (id, criminalData) => API.put(`/criminal/update/${id}`, criminalData);