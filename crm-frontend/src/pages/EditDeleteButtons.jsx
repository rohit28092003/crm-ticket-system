import React from 'react';
import axios from 'axios';

const EditDeleteButtons = ({ ticketId }) => {
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload(); // reload page after delete
    } catch (err) {
      console.error('Delete error:', err.response?.data?.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${ticketId}`,
        { status: 'closed' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload(); // reload after update
    } catch (err) {
      console.error('Update error:', err.response?.data?.message);
    }
  };

  return (
    <div className="flex space-x-2 mt-2">
      <button onClick={handleUpdate} className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">
        Mark Closed
      </button>
      <button onClick={handleDelete} className="text-sm bg-red-600 text-white px-2 py-1 rounded">
        Delete
      </button>
    </div>
  );
};

export default EditDeleteButtons;
