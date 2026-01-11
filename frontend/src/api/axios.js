// Make sure this matches your backend PORT (5000)
// If backend runs on a different PORT, update it here!
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Correct API base URL
});

export default api;
