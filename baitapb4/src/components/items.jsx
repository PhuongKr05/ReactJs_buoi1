import React from "react";

const ProductItem = ({ id, name, price, quantity, onIncrease, onDecrease }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h4>{name}</h4>
      <p>Giá: {price.toLocaleString()} đ</p>
      <p>
        Số lượng: 
        <button onClick={() => onDecrease(id)} style={{ marginLeft: 5 }}> - </button>
        <span style={{ margin: "0 10px" }}>{quantity}</span>
        <button onClick={() => onIncrease(id)}> + </button>
      </p>
    </div>
  );
};

export default ProductItem;
