import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:9354/api/v1/restaurants",
});