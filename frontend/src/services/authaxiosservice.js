import axios from 'axios';
import { constants } from '../config/config';


const axiosInstance = axios.create({
    baseURL: constants.baseUrl
});

axiosInstance.interceptors.request.use(
    function(request) {
        request.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return request;
    },
    function(error) {
    }
);

export {axiosInstance};