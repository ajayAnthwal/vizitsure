const BASE_URL = "https://www.vizitsure.com/gapi";

export async function login(email, password) {
  try {
    const response = await fetch(
      "https://www.vizitsure.com/gapi/api/auth/local",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Login failed" };
    }

    const data = await response.json();
    return { success: true, token: data.token };
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}

// Fetch Visits Data Function
export const fetchVisits = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/visits?sort[0]=createdAt:desc&pagination[pageSize]=100&populate=*&filters[createdAt][$gte]=2024-01-01`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch visits data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetching visits:", error);
    throw error;
  }
};
