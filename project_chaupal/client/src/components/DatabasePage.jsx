import React, { useState } from 'react';
import UploadForm from './UploadForm';
import './DatabasePage.css';

const initialData = [
  { id: 1, name: 'John Doe', description: 'Loan for business', loanAmount: '500000', date: '2024-02-15', status: 'Approved' },
  { id: 2, name: 'Jane Smith', description: 'Personal Loan', loanAmount: '250000', date: '2024-03-01', status: 'Pending' },
];

const DatabasePage = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingItem, setEditingItem] = useState(null);

  const addNewItem = (newItem) => {
    setData(prev => [...prev, { ...newItem, id: prev.length + 1 }]);
  };

  const updateItem = (updatedItem) => {
    setData(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  const deleteItem = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const exportToCSV = () => {
    const csvRows = [
      ['ID', 'Name', 'Description', 'Loan Amount', 'Date', 'Status'],
      ...filtered.map(item => [
        item.id,
        item.name,
        item.description,
        item.loanAmount,
        item.date,
        item.status
      ])
    ];

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'loan_applications.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = data
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="db-container">
      <button onClick={() => window.location.href = '/'} className="back-btn">
  ⬅ Back to Home
</button>

      
      <h2 className="db-title">{editingItem ? 'Edit Application' : 'Loan Applications'}</h2>

      <div className="db-summary">
        <div className="summary-card total">
          <h4>Total</h4>
          <p>{data.length}</p>
        </div>
        <div className="summary-card approved">
          <h4>Approved</h4>
          <p>{data.filter(item => item.status === 'Approved').length}</p>
        </div>
        <div className="summary-card pending">
          <h4>Pending</h4>
          <p>{data.filter(item => item.status === 'Pending').length}</p>
        </div>
        <div className="summary-card rejected">
          <h4>Rejected</h4>
          <p>{data.filter(item => item.status === 'Rejected').length}</p>
        </div>
      </div>

      <UploadForm
        onSubmit={editingItem ? updateItem : addNewItem}
        initialData={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      <div className="db-controls">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Date ↑</option>
          <option value="desc">Date ↓</option>
        </select>
        <button onClick={exportToCSV} className="export-btn">Download CSV</button>
      </div>

      <table className="db-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Loan Amount</th><th>Date</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>₹{parseInt(item.loanAmount).toLocaleString()}</td>
              <td>{item.date}</td>
              <td><span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
              <td>
                <button onClick={() => setEditingItem(item)} className="edit-btn">✏️</button>
                <button onClick={() => deleteItem(item.id)} className="delete-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatabasePage;
