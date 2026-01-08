import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token invalid or expired
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            // Optional: Redirect to login if using a global router, 
            // but for now, we just let the UI handle the failure or the user refreshes.
            // A hard redirect can be jarring, but often necessary.
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                 window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;