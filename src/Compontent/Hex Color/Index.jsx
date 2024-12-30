import React, { useState } from 'react'

const Project2 = () => {
    const[typeOfColor,setTypeOfColor]=useState('hex');
    const[color,setColor] = useState('#fff');
    const genearateRandomNum =(len)=>{
         return Math.floor(Math.random()*len);  
    }

    const handleCreateHexColor =()=>{
         const hex = [0,1,2,3,4,5,6,7,9,'A','B','C','D','E','F'];
         let hexColor = '#';
         for(let i=0;i<6;i++){
          hexColor+=hex[genearateRandomNum(hex.length)];
         }

         setColor(hexColor)

    }

    const handleCreateRgbColor =()=>{


    }

  return (
    <div style={{
        width:"100vw",
        height:"100vh",
        background:color,
    }}>
        <button onClick={()=>setTypeOfColor('hex')}>Create Hex Color</button>
        <button onClick={()=>setTypeOfColor('rbg')}>Create RGB Color</button>
        <button onClick={(typeOfColor===hex)?handleCreateHexColor:handleCreateRgbColor}>Generate Random Color</button>
    </div>
  )
}

export default Project2