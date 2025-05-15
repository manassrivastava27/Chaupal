import React from 'react';
import './DataCard.css';

const getStatusBadge = (status) => {
  const baseClass = 'status-badge';
  switch (status.toLowerCase()) {
    case 'approved':
      return `${baseClass} approved`;
    case 'pending':
      return `${baseClass} pending`;
    case 'rejected':
      return `${baseClass} rejected`;
    default:
      return baseClass;
  }
};

const DataCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="data-card">
      <div className="data-header">
        <h3>{item.name}</h3>
        <span className={getStatusBadge(item.status)}>{item.status}</span>
      </div>
      <p><strong>Email:</strong> {item.email}</p>
      <p><strong>Loan Amount:</strong> ₹{item.loanAmount}</p>
      <p><strong>Date:</strong> {item.date}</p>
      <div className="data-actions">
        <button className="edit-btn" onClick={onEdit}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DataCard;
