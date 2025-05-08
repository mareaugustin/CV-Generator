import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Création axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await authService.refreshToken();
        localStorage.setItem('access_token', data.access);
        api.defaults.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


// Authentifications
export const authService = {
  register: (data: { username: string; email: string; password: string; password2: string }) =>
    api.post('/users/register/', data),
  
  login: (data: { username: string; password: string }) =>
    api.post('/users/login/', data),
  
  refreshToken: () =>
    api.post('/token/refresh/', {
      refresh: localStorage.getItem('refresh_token'),
    }),
    
  getCurrentUser: () => api.get('/users/me/'),
};

// Pour le CV
export const resumeService = {
  getAllResumes: () => api.get('/resumes/'),
  
  getResume: (id: number) => api.get(`/resumes/${id}/`),
  
  createResume: (data: { title: string; content: any }) =>
    api.post('/resumes/', data),
  
  updateResume: (id: number, data: { title: string; content: any }) =>
    api.put(`/resumes/${id}/`, data),
  
  deleteResume: (id: string) => api.delete(`/resumes/${id}/`),
};

//   deleteResume: async (id: number) => {
//     try {
//       console.log('Token actuel:', localStorage.getItem('access_token'));
//       console.log('Tentative de suppression du CV:', id);
//       const response = await api.delete(`/resumes/${id}/`);
//       console.log('Réponse de suppression:', response);
//       return response;
//     } catch (error) {
//       console.error('Erreur de suppression:', error);
//       throw error;
//     }
//   }
// };