import React, { useState } from 'react';
import './LoanTable.css'; // Import the CSS file for LoanTable

const LoanTable = () => {
  // Sample loan data
  const [loans] = useState([
    { 
      "loanId": "L001", 
      "applicantName": "Marky", 
      "loanAmount": 50000, 
      "applicationDate": "2024-06-15", 
      "status": "Pending Review" 
    },
    { 
      "loanId": "L002", 
      "applicantName": "Turbo", 
      "loanAmount": 75000, 
      "applicationDate": "2024-06-10", 
      "status": "Under Review" 
    },
    { 
      "loanId": "L003", 
      "applicantName": "MS", 
      "loanAmount": 35000, 
      "applicationDate": "2024-06-12", 
      "status": "Pending Review" 
    }
  ]);

  return (
    <div className="loan-table-container">
      <div className="loan-table">
        <div className="loan-table__title">Loan Applications</div>
        <table className="loan-table__table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Applicant Name</th>
              <th>Loan Amount</th>
              <th>Application Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={index}>
                <td>{loan.loanId}</td>
                <td>{loan.applicantName}</td>
                <td>₹{loan.loanAmount.toLocaleString()}</td> {/* Updated for rupee symbol */}
                <td>{loan.applicationDate}</td>
                <td>
                  <span className={`status-badge ${loan.status === 'Pending Review' ? 'pending' : 'review'}`}>
                    {loan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanTable;
