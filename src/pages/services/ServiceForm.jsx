import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getService, createService, updateService } from '../../api/services';

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });

  useEffect(() => {
    if (id) {
      getService(id).then(({ data }) => setForm(data));
    }
  }, [id]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateService(id, form);
      } else {
        await createService(form);
      }
      navigate('/services');
    } catch (error) {
      console.error('Failed to save service:', error);
      alert("Save failed");
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Service' : 'New Service'}</h2>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}