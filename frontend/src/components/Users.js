import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false); // controls popup
  const [editingUser, setEditingUser] = useState(null); // null = adding new
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // Fetch all users
  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    loadUsers();
  };

  // Open Edit popup
  const openEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone });
    setPopupVisible(true);
  };

  // Open Add popup
  const openAdd = () => {
    setEditingUser(null); // adding new
    setFormData({ name: "", email: "", phone: "" });
    setPopupVisible(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update existing user
      await axios.put(
        `http://localhost:5000/api/users/${editingUser._id}`,
        formData
      );
    } else {
      // Add new user
      await axios.post("http://localhost:5000/api/users", formData);
    }
    setPopupVisible(false);
    loadUsers();
  };

  return (
    <div style={{ width: "70%", margin: "40px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User List</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Phone</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td style={td}>{u.name}</td>
              <td style={td}>{u.email}</td>
              <td style={td}>{u.phone}</td>
              <td style={td}>
                <button onClick={() => openEdit(u)} style={editBtn}>Edit</button>
                <button onClick={() => deleteUser(u._id)} style={delBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Button */}
      <button onClick={openAdd} style={addBtn}>Add User</button>

      {/* Popup Form (Add / Edit) */}
      {popupVisible && (
        <div style={popup}>
          <div style={popupBox}>
            <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                style={input}
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                style={input}
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                style={input}
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <button type="submit" style={updateBtn}>
                {editingUser ? "Update" : "Add"}
              </button>
              <button type="button" onClick={() => setPopupVisible(false)} style={closeBtn}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const th = { border: "1px solid #ddd", padding: "10px" };
const td = { border: "1px solid #ddd", padding: "10px" };

const editBtn = {
  marginRight: "10px",
  padding: "5px 10px",
  background: "#3498db",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

const delBtn = {
  padding: "5px 10px",
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

const addBtn = {
  marginTop: "15px",
  padding: "10px 15px",
  background: "#2ecc71",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #bbb",
};

const updateBtn = {
  padding: "10px 15px",
  background: "green",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const closeBtn = {
  padding: "10px 15px",
  background: "gray",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const popup = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupBox = {
  width: "350px",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
};
