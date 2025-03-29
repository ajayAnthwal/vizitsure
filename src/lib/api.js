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



// Create Gate Pass Function
export const createGatePass = async (mobile) => {
  try {
    const response = await axiosInstance.get(
      `/api/visitors?filters[mobile][$eq]=${mobile}&populate=*`
    );

    return response.data;
  } catch (error) {
    console.error("Error in creating gate pass:", error);
    throw error;
  }
};

// Create Visitors Function
export const createVisitors = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/visitors`, payload
    );

    return response.data;
  } catch (error) {
    console.error("Error in creating gate pass:", error);
    return  error.response.data.message
  }
};


export const uploadProfilePhoto = async (file, visitorId, companyId) => {
  try {
    const formData = new FormData();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}_${month}`;
    formData.append("files", file);
    formData.append("ref", "api::visitor.visitor");
    formData.append("refId", visitorId);
    formData.append("field", "profile");
    formData.append("path", `${companyId}/${visitorId}/${formattedDate}`);

    const token = localStorage.getItem("token"); 

    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data[0]?.url || null; 
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return null;
  }
};

export const createVisitorDocument = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/visitor-documents`, payload
    );

    return response.data;
  } catch (error) {
    console.error("Error in creating gate pass:", error);
    return  error.response.data.message
  }
};


// Upload Document Function
export const uploadDocument = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/upload`, payload
    );

    return response.data;
  } catch (error) {
    console.error("Error in creating gate pass:", error);
    return  error.response.data.message
  }
};

