import axios from "axios";

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axios;