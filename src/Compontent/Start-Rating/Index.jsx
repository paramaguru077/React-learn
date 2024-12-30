import React, { useState } from 'react'
import {FaStar} from 'react-icons/fa'
import './Style.css'
const Project3 = ({noOfStar=5}) => {
    const[rating,setRating]=useState();
    const handleClick =(id)=>{
      setRating(id);
    }
  return (
    <div className='star-rating'>
        {
            [...Array(noOfStar)].map((_,index)=> (
                 
                 <FaStar
                key={index+1}
                className={index+1<=rating?'active':'inactive'}
                onClick={()=>handleClick(index+1)}
               
                />

            ))
        }
    </div>
  )
}

export default Project3