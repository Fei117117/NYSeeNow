import React from 'react';

const AttractionCard = ({ attraction, onDelete }) => {
  return (
    <div className="attraction-card">
      <div className="card-header">
        <h2>{attraction.name}</h2>
        <button className="card-delete-button" onClick={() => onDelete(attraction.name)}>X</button>
      </div>
      <p className="card-content">This is a placeholder for your attraction details. Replace this text with the actual details.</p>
    </div>
  );
};

export default AttractionCard;