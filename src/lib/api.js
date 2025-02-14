import axios from "axios";

const BASE_URL = "https://www.vizitsure.com/gapi";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login function
export async function login(identifier, password) {
  try {
    const response = await axiosInstance.post("/api/auth/local", {
      identifier,
      password,
    });

    localStorage.setItem("auth", response.data.jwt);

    return { success: true, token: response.data.token };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
}


// Get Visit data
export const fetchVisits = async (page = 1, itemsPerPage = 10) => {
  try {
    const response = await axiosInstance.get(
      `/api/visits?pagination[page]=${page}&pagination[pageSize]=${itemsPerPage}`
    );

    return response.data;
  } catch (error) {
    console.error("Error in fetching visits:", error);
    throw error;
  }
};
