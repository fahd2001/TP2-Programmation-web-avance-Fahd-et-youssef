import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

// Exemple : GET /api/ouvrages
export const fetchOuvrages = async () => {
  const response = await api.get("/api/ouvrages");
  return response.data;
};

// Exemple : GET /api/ouvrages/:id
export const fetchOuvrageById = async (id) => {
  const response = await api.get(`/api/ouvrages/${id}`);
  return response.data;
};

export default api;
