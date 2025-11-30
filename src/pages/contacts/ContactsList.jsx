import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContacts, deleteContact } from '../../api/contacts';

export default function ContactsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getContacts();
        setItems(data);
      } catch (err) {
        console.error("Failed to load contacts", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm("Delete this contact?")) return;
    try {
      await deleteContact(id);
      setItems((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Contacts</h2>
      <Link to="/contacts/new">+ New Contact</Link>
      {items.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>First Name</th><th>Last Name</th><th>Email</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c._id}>
                <td>{c.firstname}</td>
                <td>{c.lastname}</td>
                <td>{c.email}</td>
                <td>
                  <Link to={`/contacts/${c._id}`} style={{ marginRight: 8 }}>Edit</Link>
                  <button onClick={() => onDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}