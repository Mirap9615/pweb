import React from 'react';
import './ReviewedItem.css'; 

function ReviewedItem({ id, name, score, image, finished, reviewsNotes, clickState, onClick }) {
  return (
    <div className={`reviewed-item ${clickState ? 'expanded' : ''}`} onClick={onClick}>
      {clickState ? (
        <>
          <img src={image} alt={name} className="reviewed-item-image expanded-image" />
          <div className="item-expanded-info">
            <h3>{name}</h3>
            <p>Score: {score}</p>
            <p>Finished: {finished ? 'Yes' : 'No'}</p>
            <p className="reviews-notes">{reviewsNotes}</p>
          </div>
        </>
      ) : (
        <>
          {image && <img src={image} alt={name} className="reviewed-item-image" />}
          <div className="item-info">
            <h3>{name}</h3>
            <p>Score: {score}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ReviewedItem;
