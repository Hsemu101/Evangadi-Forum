import axios from "axios";


const axiosConfig = axios.create({
    baseURL: "https://localhost:5500/api/"
})

export default axiosConfig