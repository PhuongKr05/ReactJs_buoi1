import React, { useState } from "react";
import ProductItem from "./items";
import { mockProducts } from "../data/mock";

function Cart() {
  const [products, setProducts] = useState(mockProducts);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrease = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    setProducts((prevProducts) => {
      const total = prevProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
      return prevProducts;
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>🛒 Giỏ hàng</h2>
      {products.map((item) => (
        <ProductItem
          key={item.id}
          {...item}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      ))}

      <button onClick={calculateTotal} style={{ marginTop: 10 }}>
       Tổng tiền
      </button>

      <p style={{ fontWeight: "bold" }}>
        Tổng tiền: {totalPrice.toLocaleString()} đ
      </p>
    </div>
  );
}

export default Cart;
