import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  checkout
} from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    const confirmed = window.confirm('Are you sure you want to checkout?');
    if (!confirmed) return;

    const payload = {
      paySuccess: true,
      productsInOrder: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    dispatch(checkout(payload))
      .unwrap()
      .then(() => {
        toast.success('Payment successful!');
        navigate('/products');
      })
      .catch((err) => {
        const message = typeof err === 'string' ? err : err?.message || 'Unknown error';
        toast.error('Checkout failed: ' + message);
      });
  };

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <h2>Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onIncrease={() => dispatch(increaseQuantity(item.productId))}
            onDecrease={() => dispatch(decreaseQuantity(item.productId))}
            onRemove={() => dispatch(removeFromCart(item.productId))}
          />
        ))}
      </div>
      <div className="summary">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping: ${shipping}</p>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={handleCheckout} disabled={cartItems.length === 0}>Checkout</button>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
