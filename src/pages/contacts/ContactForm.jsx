import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContact, createContact, updateContact } from '../../api/contacts';

export default function ContactForm() {
  const { id } = useParams(); // if editing, we get the contact id
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '' });

  // Load existing contact if editing
  useEffect(() => {
    if (id) {
      getContact(id).then(({ data }) => setForm(data));
    }
  }, [id]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateContact(id, form);
      } else {
        await createContact(form);
      }
      navigate('/contacts'); // go back to list
    } catch (error) {
      console.error('Failed to save contact:', error);
      alert("Save failed");
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Contact' : 'New Contact'}</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
        <input
          name="firstname"
          value={form.firstname}
          onChange={onChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastname"
          value={form.lastname}
          onChange={onChange}
          placeholder="Last Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}