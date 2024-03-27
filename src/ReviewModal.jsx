import React from 'react';
import './ReviewModal.css'; 

function ReviewModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{item.name}</h2>
        <p>Score: {item.score}</p>
        <p>Finished: {item.finished ? 'Yes' : 'No'}</p>
        <p>{item.reviewsNotes}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ReviewModal;
