import React from 'react';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cart-item">
      <img
        src={item.imageUrl}
        alt={item.productName}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/fallback.jpg'; 
        }}
      />
      <div>
        <h3>{item.productName}</h3>
        <p>{item.description}</p>
        <div className="quantity-controls">
          <button onClick={() => onDecrease(item.productId)} disabled={item.quantity <= 1}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.productId)} disabled={item.quantity >= 99}>+</button>
        </div>
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button className="delete-btn" onClick={() => onRemove(item.productId)}>🗑️</button>
    </div>
  );
};

export default CartItem;
