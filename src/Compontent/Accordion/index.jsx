import React, { useState } from 'react'
import data from './data'
import '../Accordion/style.css'
 const Accordian = () => {
    const[selected,setSelected]= useState(null);
    const handleSingleSelection =(id)=>{
        setSelected(id===selected?null:id);

    }
  return (
    <div className='wrapper'>
        <div className='accordian'>
           {
            data && data.length>0? (
                data.map((dataitem,i)=>(
                    <div className='item'>
                        <div onClick={()=>handleSingleSelection(dataitem.id)} className='title' >
                            <h3>{dataitem.question}</h3>
                            <span>+</span>
                        </div> 
                        {
                            selected===dataitem.id ?
                            <div className='content'>
                                {dataitem.answer}
                            </div>:null
                        }
                    </div>
                ))

            ):(
               <div>
                No data found !
                </div>
            )
            
           }
        </div>
    </div>
  )
}


export default Accordian