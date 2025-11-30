import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../api/users';

export default function UsersList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getUsers();
        setItems(data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setItems((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users</h2>
      <Link to="/users/new">+ New User</Link>
      {items.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>First Name</th><th>Last Name</th><th>Email</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u._id}>
                <td>{u.firstname}</td>
                <td>{u.lastname}</td>
                <td>{u.email}</td>
                <td>
                  <Link to={`/users/${u._id}`} style={{ marginRight: 8 }}>Edit</Link>
                  <button onClick={() => onDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}