import React, { useState } from 'react'
import { useEffect } from 'react';
import './style.css'
const  LoadMoreData = () => {

    const[loading,setLoading]= useState(false);
    const[products,setProducts]= useState([]);
    const[count,setCount] = useState(0);
    const[disable,setDisable]= useState(false);

    const fetchData = async()=>{
        try{
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count===0?0:count*20}`)

            const results = await response.json();
           
            console.log(results);
            if(results && results.products ){
              setProducts(prevProducts=> [...prevProducts,...results.products]);

              setLoading(false);
            }
        }
        catch(e){
          console.log(e);
          setLoading(false);    
        }
    }

    useEffect(()=>{
      fetchData();
    },[count]);

    useEffect(()=>{
      if(products&& products.length>100){
        setDisable(true);
      }
    },[products]);


    if(loading){
      return <div className='loading'>Loading data ! please wait </div>
    }
    

    
  return (
    <div className='load-more-container'>
      <div className='product-container'>
        {products && products.length ? (
          products.map((products,i)=>(
            <div className='products' key={i}>
              <img src={products.thumbnail} alt={products.title}/>
              <p>{products.title}</p>

            </div>
          ))
        ):(<div> <h1> closed </h1></div>) }
      </div>
      <div className='button-contaier'>
        <button  onClick={()=> setCount(count+1)} disabled={disable}>Load More Products</button>
      </div>{
        disable&& <p> data full</p>
      }
    </div>
  )
}

export default LoadMoreData;