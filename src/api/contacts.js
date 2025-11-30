import api from './client';

// Get all contacts
export const getContacts = () => api.get('/api/contacts');

// Get one contact by ID
export const getContact = (id) => api.get(`/api/contacts/${id}`);

// Create a new contact
export const createContact = (data) => api.post('/api/contacts', data);

// Update an existing contact
export const updateContact = (id, data) => api.put(`/api/contacts/${id}`, data);

// Delete a contact
export const deleteContact = (id) => api.delete(`/api/contacts/${id}`);