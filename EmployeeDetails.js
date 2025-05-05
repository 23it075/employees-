import React from 'react';

function EmployeeDetails({ employee, onClose }) {
  if (!employee) return null;

  const profilePicUrl = employee.profilePic
    ? `http://localhost:5000/uploads/${employee.profilePic}`
    : null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center',
    }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', minWidth: '300px' }}>
        <h3>Employee Details</h3>
        {profilePicUrl && <img src={profilePicUrl} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Type:</strong> {employee.type}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EmployeeDetails;
