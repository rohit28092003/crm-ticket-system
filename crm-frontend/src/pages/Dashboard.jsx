import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditDeleteButtons from './EditDeleteButtons';
const fetchAllTickets = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/tickets/admin/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTickets(res.data); // overwrite existing tickets
  } catch (err) {
    console.error(err.response?.data?.message || 'Failed to fetch all tickets');
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('user'); // 👈 track role in state

  // ⬇️ Extract role from JWT
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setRole(decoded.role); // 👈 set role from payload
      } catch (error) {
        console.error('Invalid token');
      }
    }
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/tickets',
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTickets((prev) => [res.data, ...prev]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err.response?.data?.message || 'Ticket creation failed');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* ✅ Conditionally Render View All Tickets (Admin Only) */}
     {role === 'admin' && (
  <button
    onClick={fetchAllTickets}
    className="mb-4 bg-purple-600 text-white px-4 py-2 rounded"
  >
    View All Tickets (Admin)
  </button>
)}


      <form onSubmit={createTicket} className="mb-6 space-y-3">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Ticket Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Ticket
        </button>
      </form>

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul className="space-y-2">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="bg-gray-100 p-4 rounded shadow">
              <p><strong>Title:</strong> {ticket.title}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <EditDeleteButtons ticketId={ticket._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
