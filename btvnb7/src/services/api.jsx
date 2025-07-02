import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = () => API.get('/users');
export const fetchUserById = (id) => API.get(`/users/${id}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const fetchAlbumsByUser = (userId) => API.get(`/users/${userId}/albums`);
export const createAlbum = (data) => API.post('/albums', data);
export const deleteAlbum = (albumId) => API.delete(`/albums/${albumId}`);
export const fetchPhotos = (params) => API.get('/photos', { params });
