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
        `https://dummyjson.com/products?limit=5&skip=${count * 20}`
      );
      const results = await response.json();
      if (results && results.products) {
        setProducts((prevProducts) => [...prevProducts, ...results.products]);
        setLoading(false);
        if (results.products.length === 0) {
          setDisable(true); // Disable button if no more products
        }
      }
    } catch (e) {
      console.error(e);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const handleScroll =()=>{
   
    if(window.innerHeight+document.documentElement.scrollTop+1>=document.documentElement.scrollHeight){
      setLoading(true);
      setCount(prev=>prev+1);
    }
  }
  

  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
    return ()=>window.removeEventListener("scroll",handleScroll);
  },[])
  

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products && products.length ? (
          products.map((product, i) => (
            <div className="products" key={i}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
              <button>Add to card</button>
            </div>
          ))
        ) : (
          <div className='wait'>
            <h1>Wait for some time</h1>
          </div>
        )}
      </div>
       <div className='loading'>
       {loading&& !disable &&<p> Please wait</p>}
       </div>
       <div className='empty'>
       {disable&& <h1> no products available</h1>}
       </div>
      
     
    </div>
  );
};

export default LoadMoreData;
