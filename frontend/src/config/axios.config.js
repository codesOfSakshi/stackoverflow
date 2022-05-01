import axios from 'axios';
import { constants } from './config';

const axiosApi = axios.create({
    baseURL: constants.IP.ipAddress + constants.IP.xport,
});

axiosApi.interceptors.request.use(
    function (request) {
        console.log("AXIOS REQUEST", request);
        // console.log(localStorage.getItem('token'));
        // request.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return request;
    },
    function (error) {
        console.log(error);
    }
);

export default axiosApi;