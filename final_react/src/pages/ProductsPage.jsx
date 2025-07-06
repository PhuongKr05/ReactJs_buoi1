import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ProductDetail from '../components/ProductDetail';
import { toast } from 'react-toastify';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleIncrease = () => {
    if (quantity < 99) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: selectedProduct, quantity }));
    toast.success('Added to cart!');
  };

  return (
    <div className="products-page">
      <div className="left-panel">
        <ProductDetail
          product={selectedProduct}
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onAddToCart={handleAddToCart}
        />
      </div>

      <div className="right-panel">
        {products.map((p) => (
          <div key={p.productId} className="product-preview">
            <img
              src={p.imageUrl}
              alt={p.productName}
              onError={(e) => (e.target.src = '/fallback.jpg')}
            />
            <div>
              <h4>{p.productName}</h4>
              <p>{p.description}</p>
              <p><strong>${p.price}</strong></p>
              <button onClick={() => handleSelect(p)}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;