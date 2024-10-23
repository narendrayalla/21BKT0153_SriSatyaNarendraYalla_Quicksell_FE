import React from 'react';
import '../styles/recruiterModal.css'; // Create a separate CSS file for the modal

const RecruiterModal = ({ onClose }) => {
  return (
    <div className="recruiter-modal-overlay">
      <div className="recruiter-modal">
        <h2>👋 Hello, [Recruiter’s Name]!</h2>
        <p>Thank you for reviewing my assignment! I’m excited about the opportunity to join your team and contribute to your success.</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RecruiterModal;
