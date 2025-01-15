import axios from 'axios';

// URL de base de votre backend (configurable via .env)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Créer une instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonctions pour interagir avec l'API des livres
export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const getBookDetails = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export default api;