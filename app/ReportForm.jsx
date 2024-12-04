'use client';

import { createReport } from '../contentful';

export default function ReportForm({ email }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportText = e.target.report.value;
    if (email) {
      await createReport(email, reportText);
      e.target.reset();
    } else {
      console.error('No valid email found.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
      }}
    >
      <label
        htmlFor="report"
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '8px',
        }}
      >
        Create Report
      </label>
      <input
        id="report"
        name="report"
        type="text"
        placeholder="Enter your report here..."
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
          width: '100%',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        Submit Report
      </button>
    </form>
  );
}
