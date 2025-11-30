import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, deleteProject } from '../../api/projects';

export default function ProjectsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getProjects();
        setItems(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      setItems((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Projects</h2>
      <Link to="/projects/new">+ New Project</Link>
      {items.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>Title</th><th>Description</th><th>Completion</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{new Date(p.completion).toLocaleDateString()}</td>
                <td>
                  <Link to={`/projects/${p._id}`} style={{ marginRight: 8 }}>Edit</Link>
                  <button onClick={() => onDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}