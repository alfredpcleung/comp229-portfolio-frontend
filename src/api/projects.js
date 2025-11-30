import api from './client';

// Get all projects
export const getProjects = () => api.get('/api/projects');

// Get one project by ID
export const getProject = (id) => api.get(`/api/projects/${id}`);

// Create a new project
export const createProject = (data) => api.post('/api/projects', data);

// Update an existing project
export const updateProject = (id, data) => api.put(`/api/projects/${id}`, data);

// Delete a project
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);