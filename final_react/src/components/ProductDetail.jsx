import React from 'react';

const ProductDetail = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onAddToCart,
}) => {
  if (!product) return <div className="product-detail">Select a product</div>;

  return (
    <div className="product-detail">
      <img
        src={product.imageUrl}
        alt={product.productName}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/fallback.jpg';
        }}
      />
      <h2>{product.productName}</h2>
      <p>{product.description}</p>
      <div className="quantity-controls">
        <button onClick={onDecrease} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease} disabled={quantity >= 99}>+</button>
      </div>
      <p>Total: ${ (product.price * quantity).toFixed(2) }</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
