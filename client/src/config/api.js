// API configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_URL}/api/auth/login`,
  REGISTER: `${API_URL}/api/auth/register`,
  GET_ME: `${API_URL}/api/auth/me`,
  UPDATE_PROFILE: `${API_URL}/api/auth/update-profile`,
  CHANGE_PASSWORD: `${API_URL}/api/auth/change-password`,
  
  // Clients endpoints
  CLIENTS: `${API_URL}/api/clients`,
  CLIENT: (id) => `${API_URL}/api/clients/${id}`,
  
  // Leads endpoints
  LEADS: `${API_URL}/api/leads`,
  LEAD: (id) => `${API_URL}/api/leads/${id}`,
  
  // Tasks endpoints
  TASKS: `${API_URL}/api/tasks`,
  TASK: (id) => `${API_URL}/api/tasks/${id}`,
  
  // Dashboard endpoints
  DASHBOARD_STATS: `${API_URL}/api/dashboard/stats`,
};

export default API_URL;
