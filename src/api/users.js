import api from './client';

// Get all users
export const getUsers = () => api.get('/api/users');

// Get one user by ID
export const getUser = (id) => api.get(`/api/users/${id}`);

// Create a new user
export const createUser = (data) => api.post('/api/users', data);

// Update an existing user
export const updateUser = (id, data) => api.put(`/api/users/${id}`, data);

// Delete a user
export const deleteUser = (id) => api.delete(`/api/users/${id}`);