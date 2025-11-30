import api from './client';

// Get all services
export const getServices = () => api.get('/api/services');

// Get one service by ID
export const getService = (id) => api.get(`/api/services/${id}`);

// Create a new service
export const createService = (data) => api.post('/api/services', data);

// Update an existing service
export const updateService = (id, data) => api.put(`/api/services/${id}`, data);

// Delete a service
export const deleteService = (id) => api.delete(`/api/services/${id}`);