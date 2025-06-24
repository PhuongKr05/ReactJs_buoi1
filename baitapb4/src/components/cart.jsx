import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import ProductItem from "./items";

function Cart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [calculate, setCalculate] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/carts");
        const apiProducts = res.data.carts?.[0]?.products.map(product => ({
          ...product,
          quantity: product.quantity || 1
        })) || [];
        setProducts(apiProducts);
      } catch (err) {
        console.error("ERROR", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleIncrease = useCallback((id) => {
    setProducts((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }, []);

  const handleDecrease = useCallback((id) => {
    setProducts((prev) => {
      return prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      );
    });
  }, []);

  const calculateTotal = () => {
    setCalculate(true);
  };

  const total = useMemo(() => {
    if (calculate) {
      const total = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setCalculate(false);
      return total;
    }
    return totalPrice;
  }, [products, calculate, totalPrice]);

  useEffect(() => {
    setTotalPrice(total);
  }, [total]);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>🛒 Giỏ hàng</h2>
      <div style={{ marginBottom: 15 }}>
        <button onClick={calculateTotal}>Tính tổng tiền</button>
        <p style={{ fontWeight: "bold", marginTop: 10 }}>
          Tổng tiền: {totalPrice.toLocaleString()} đ
        </p>
      </div>

      {products.map((item) => (
        <ProductItem
          key={item.id}
          id={item.id}
          name={item.title}
          price={item.price}
          quantity={item.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      ))}
    </div>
  );
}

export default Cart;
