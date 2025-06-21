import axios, { AxiosInstance } from "axios";

// JSON Server Base URL
const BASE_URL = "http://localhost:4000";
export const IMAGE_URL = "http://localhost:4000"; 

// Create Axios instance for local JSON Server
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add interceptor to inject fake token if needed 
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

// Auth endpoints
export const AUTH_URLS = {
  login: "/users",
  get_current_user: (id: string) => `/users/${id}`,
};

// Dashboard endpoint
export const getDashboard = "/dashboard"; 

// Room endpoints
export const ROOM_URLS = {
  getAllRooms: "/rooms",
  deleteRoom: (id: string) => `/rooms/${id}`,
  getRoomDetails: (id: string) => `/rooms/${id}`,
  createRoom: "/rooms",
  updateRoom: (roomId: string) => `/rooms/${roomId}`,
  getRoomById: (roomId: string) => `/rooms/${roomId}`,
};
