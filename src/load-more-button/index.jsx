import React, { useState, useEffect } from 'react';
import './style.css';

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const results = await response.json();
      if (results && results.products) {
        setProducts((prevProducts) => [...prevProducts, ...results.products]);
        if (results.products.length === 0) {
          setDisable(true); // Disable button if no more products
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    setCount((c) => c + 1);
  };

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products && products.length ? (
          products.map((product, i) => (
            <div className="products" key={i}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
            </div>
          ))
        ) : (
          <div>
            <h1>No Products Available</h1>
          </div>
        )}
      </div>
      <div className="button-container">
        <button type="button" onClick={handleClick} disabled={disable}>
          {loading ? 'Loading...' : 'Load More Products'}
        </button>
      </div>
      {disable && <p>No more products to load.</p>}
    </div>
  );
};

export default LoadMoreData;
