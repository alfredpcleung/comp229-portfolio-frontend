import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProject, createProject, updateProject } from '../../api/projects';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', completion: '' });

  useEffect(() => {
    if (id) {
      getProject(id).then(({ data }) => {
        setForm({
          title: data.title,
          description: data.description,
          completion: data.completion ? data.completion.substring(0, 10) : ''
        });
      });
    }
  }, [id]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProject(id, form);
      } else {
        await createProject(form);
      }
      navigate('/projects');
    } catch (error) {
      console.error('Failed to save project:', error);
      alert("Save failed");
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Project' : 'New Project'}</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="completion"
          value={form.completion}
          onChange={onChange}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}