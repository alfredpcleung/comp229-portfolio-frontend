import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices, deleteService } from '../../api/services';

export default function ServicesList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getServices();
        setItems(data);
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      setItems((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Services</h2>
      <Link to="/services/new">+ New Service</Link>
      {items.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>Title</th><th>Description</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s._id}>
                <td>{s.title}</td>
                <td>{s.description}</td>
                <td>
                  <Link to={`/services/${s._id}`} style={{ marginRight: 8 }}>Edit</Link>
                  <button onClick={() => onDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}