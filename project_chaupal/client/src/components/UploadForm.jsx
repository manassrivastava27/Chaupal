import React, { useState, useEffect } from 'react';
import './UploadForm.css';

const UploadForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    loanAmount: '',
    date: '',
    status: 'Pending',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        description: initialData.description || '',
        loanAmount: initialData.loanAmount || '',
        date: initialData.date || '',
        status: initialData.status || 'Pending',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.description && form.loanAmount && form.date) {
      const updatedForm = initialData ? { ...initialData, ...form } : form;
      onSubmit(updatedForm);
      if (!initialData) {
        setForm({ name: '', description: '', loanAmount: '', date: '', status: 'Pending' });
      }
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter applicant name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Enter loan purpose or description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="loanAmount"
        placeholder="Enter loan amount"
        value={form.loanAmount}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        placeholder="Select application date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Approved">Approved</option>
        <option value="Pending">Pending</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button type="submit">{initialData ? 'Update' : 'Submit Application'}</button>
      {initialData && (
        <button type="button" onClick={onCancel} style={{ backgroundColor: '#999' }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default UploadForm;
