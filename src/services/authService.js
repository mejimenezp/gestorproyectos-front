import api from "./apiService";
import { jwtDecode } from 'jwt-decode'; 

const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/token/', { username, password });
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (username, password, email, firstName, lastName, companyId,) => {
    try {
      const response = await api.post('/users/', { 
        username, 
        password, 
        email,
        first_name: firstName,
        last_name: lastName,
        company: companyId
        
      });
      return response.data;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const response = await api.post('/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('accessToken', response.data.access);
        return response.data.access;
      }
    } catch (error) {
      throw error;
    }
  },

  isTokenExpired: (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now(); 
    } catch (error) {
      return true; 
    }
  }
};

export default authService;
