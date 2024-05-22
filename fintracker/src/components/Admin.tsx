import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/users');
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleActivationToggle = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`http://localhost:3001/admin/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Error updating user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container container mt-4">
      <h2>Admin Page</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-4"
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button 
                  className={`btn ${user.isActive ? 'btn-danger' : 'btn-success'}`} 
                  onClick={() => handleActivationToggle(user._id, !user.isActive)}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
