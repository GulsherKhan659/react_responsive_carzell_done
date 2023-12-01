import axios from 'axios';
import {getCookie} from "../Hooks/UseGenericFunctions";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_CARZELLE_API_PREFIX, // Replace with getApiPrefix()
    headers: {
        'Authorization': 'Bearer ' + getCookie('CARZELLE_API_TOKEN'),
        'Content-Type': 'application/json',
    },
});

const setAccessToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 500) ) {
            window.location.href='/login';
        }
        return Promise.reject(error);
    }
);

export { axiosInstance, setAccessToken };