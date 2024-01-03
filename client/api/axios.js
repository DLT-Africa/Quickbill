import axios from "axios";
const BASE_URL = "https://quickbill-2oy7.onrender.com/";

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

