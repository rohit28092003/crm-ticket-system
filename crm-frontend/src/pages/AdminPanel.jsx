import React, { useEffect, useState } from 'react';
import axios from 'axios';
const toggleRole = async (userId, newRole) => {
  const token = localStorage.getItem('token');
  try {
    await axios.put(
      `http://localhost:5000/api/users/${userId}/role`,
      { role: newRole },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUsers(); // reload list
  } catch (err) {
    console.error("Failed to change role", err);
  }
};

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel - All Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
        <tbody>
  {users.map((u) => (
    <tr key={u._id} className="text-center">
      <td className="p-2 border">{u.name}</td>
      <td className="p-2 border">{u.email}</td>
      <td className="p-2 border">{u.role}</td>
      <td className="p-2 border">
        {u.role === "user" ? (
          <button
            onClick={() => toggleRole(u._id, "admin")}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Make Admin
          </button>
        ) : (
          <button
            onClick={() => toggleRole(u._id, "user")}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove Admin
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default AdminPanel;
