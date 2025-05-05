import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeDetails from './EmployeeDetails';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const token = localStorage.getItem('token');

  const fetchEmployees = async (query = '') => {
    try {
      const url = query
        ? `http://localhost:5000/api/employees/search/${query}`
        : 'http://localhost:5000/api/employees';
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees(data);
      } else {
        alert(data.message || 'Failed to fetch employees');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(searchQuery);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees(employees.filter(emp => emp._id !== id));
      } else {
        alert(data.message || 'Failed to delete employee');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setShowForm(true);
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditEmployee(null);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Employee List</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={() => { setShowForm(true); setEditEmployee(null); }}>
          Add Employee
        </button>
      </form>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.type}</td>
              <td>
                <button onClick={() => handleViewDetails(emp)}>View</button>{' '}
                <button onClick={() => handleEdit(emp)}>Edit</button>{' '}
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="5">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showForm && (
        <EmployeeForm
          employee={editEmployee}
          onClose={handleFormClose}
        />
      )}
      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

export default EmployeeList;
