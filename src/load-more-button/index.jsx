import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const loaderRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${count * 20}`
      );
      const results = await response.json();
      if (results && results.products) {
        setProducts((prevProducts) => [...prevProducts, ...results.products]);
        setLoading(false);
        if (results.products.length === 0) {
          setDisable(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !disable) {
          setCount((prevCount) => prevCount + 1);
        }
      }
      
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current); 
      }
    };
  }, [loading, disable]);

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products && products.length ? (
          products.map((product, i) => (
            <div className="products" key={i}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
              <button>Add to cart</button>
            </div>
          ))
        ) : (
          <div className="wait">
            <h1>Wait for some time</h1>
          </div>
        )}
      </div>
      <div ref={loaderRef} className="loading">
        {loading && !disable && <p>Loading more...</p>}
      </div>
      <div className="empty">
        {disable && <h1>No products available</h1>}
      </div>
    </div>
  );
};

export default LoadMoreData;
