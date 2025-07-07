import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product, onSelect }) => {
  return (
    <div className="product-item">
      <img
        src={product.imageUrl}
        alt={product.productName}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/fallback.jpg'; 
        }}
      />
      <div className="product-info">
        <h3 onClick={() => onSelect(product)}>{product.productName}</h3>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
        <button onClick={() => onSelect(product)}>Details</button>
      </div>
    </div>
  );
};

export default ProductItem;
