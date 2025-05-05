import React, { useState, useEffect } from 'react';

function EmployeeForm({ employee, onClose }) {
  const [name, setName] = useState(employee ? employee.name : '');
  const [email, setEmail] = useState(employee ? employee.email : '');
  const [phone, setPhone] = useState(employee ? employee.phone : '');
  const [type, setType] = useState(employee ? employee.type : '');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setPhone(employee.phone);
      setType(employee.type);
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('type', type);
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }

      const url = employee
        ? `http://localhost:5000/api/employees/${employee._id}`
        : 'http://localhost:5000/api/employees';
      const method = employee ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onClose();
      } else {
        setError(data.message || 'Failed to save employee');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
      <h3>{employee ? 'Edit Employee' : 'Add Employee'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label><br />
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label><br />
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Type:</label><br />
          <select value={type} onChange={e => setType(e.target.value)} required>
            <option value="">Select type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contractor">Contractor</option>
          </select>
        </div>
        <div>
          <label>Profile Picture:</label><br />
          <input type="file" accept="image/*" onChange={e => setProfilePic(e.target.files[0])} />
        </div>
        <button type="submit">{employee ? 'Update' : 'Add'}</button>{' '}
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
