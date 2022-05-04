import axios from 'axios';
import { constants } from "../config/config";

export default axios.create({
    baseURL: constants.baseUrl,
});