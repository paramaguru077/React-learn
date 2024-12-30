import React, { useEffect, useState } from 'react'
import './Style.css'
import {BsArrowLeftCircleFill,BsArrowRightCircleFill} from 'react-icons/bs';
const ImageSlider = ({url,limit=5}) => {
    const[images,setImages]=useState([]);
    const[currentSlider,setCurrentSlider]= useState(0);
    const[errorMsg,setErrorMsg]= useState(null);
    const[loading,setLoading]= useState(false);


    const fetchImage = async(getUrl)=>{
        try{
            setLoading(true);
            const response = await fetch(`${getUrl}?page=1&limit=${limit}`);
            const data = await response.json();
           
            if(data){
                setImages(data);
                setLoading(false);
            }

        }
        catch(e){
            setImages(e.message);
            setLoading(false);
        }

    }
    const handleLeft =()=>{
        setCurrentSlider(currentSlider===0? images.length-1 : currentSlider-1);

    }

    const handleRigth =()=>{
        setCurrentSlider(currentSlider===images.length-1? 0 :currentSlider+1 )
    }

   useEffect(()=>{
      if(url!=='') fetchImage(url);
   },[url]);


  if(loading){
    return <div> <h1>data is loading</h1></div>
  }
  if(errorMsg!==null){
    return <div> <h1>Error occurs {errorMsg}</h1></div>
  }


  return (
    <div className='container'>
        <BsArrowLeftCircleFill onClick={handleLeft} className='arrow arrow-left'/>
        {
            images && images.length>0 ?(
                images.map((imageItem,i)=>(
                    <img
                     src={imageItem.download_url}
                     alt={imageItem.download_url} 
                     className={currentSlider===i ? "current-image": "current-image hide-current-image"}
                     key={i}
                     />
                ))
            ):(
                <div><h1> data is not found </h1> </div>
            )
        }
        <BsArrowRightCircleFill onClick={handleRigth} className='arrow arrow-rigth'/>
        <span className='circle-indicator'> 
            { 
                images && images.length>0 ? (
                    images.map((_,index)=>(
                        <button key={index} className={currentSlider===index?"current-indicator":"current-indicator hide-current-indicator"} onClick={()=> setCurrentSlider(index)}></button>
                    ))
                ):(null)
            }

        </span>

    </div>
  )
}

export default ImageSlider