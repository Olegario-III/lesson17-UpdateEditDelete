import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Jacob", email: "jacob@example.com" },
    { id: 2, name: "Jovan", email: "jovan@example.com" },
  ]);

  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null); // Track which user is being edited

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name.trim() === "" || form.email.trim() === "") return;

    if (editId) {
      // 🔁 Edit existing user
      const updatedUsers = users.map((user) =>
        user.id === editId ? { ...user, ...form } : user
      );
      setUsers(updatedUsers);
      setEditId(null);
    } else {
      // ➕ Add new user
      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
      };
      setUsers([...users, newUser]);
    }

    setForm({ name: "", email: "" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  return (
    <div className="App">
      <h1>Lesson 17: Edit and Delete Users</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">{editId ? "Update User" : "Add User"}</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
