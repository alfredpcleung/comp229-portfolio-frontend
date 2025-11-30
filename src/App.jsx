import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContactsList from './pages/contacts/ContactsList';
import ContactForm from './pages/contacts/ContactForm';
import UsersList from './pages/users/UsersList';
import UserForm from './pages/users/UserForm';
import ProjectsList from './pages/projects/ProjectsList';
import ProjectForm from './pages/projects/ProjectForm';
import ServicesList from './pages/services/ServicesList';
import ServiceForm from './pages/services/ServiceForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route goes to contacts list */}
        <Route path="/" element={<Navigate to="/contacts" replace />} />

        {/* Contacts routes */}
        <Route path="/contacts" element={<ContactsList />} />
        <Route path="/contacts/new" element={<ContactForm />} />
        <Route path="/contacts/:id" element={<ContactForm />} />

        {/* Users */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserForm />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/new" element={<ProjectForm />} />
        <Route path="/projects/:id" element={<ProjectForm />} />

        {/* Services */}
        <Route path="/services" element={<ServicesList />} />
        <Route path="/services/new" element={<ServiceForm />} />
        <Route path="/services/:id" element={<ServiceForm />} />
      </Routes>
    </BrowserRouter>
  );
}