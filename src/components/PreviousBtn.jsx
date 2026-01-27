import React from 'react'
import { useNavigate } from 'react-router-dom'

function PreviousBtn({name}) {
    const navigate = useNavigate();
    const handelClick = ()=>{
        if(name?.toLowerCase() === 'previous'){
            navigate(-1)
        } else{
            navigate("/home")
        }
    }
  return (
    <>
        <button 
            className='btn btn-secondary my-2' 
            onClick={handelClick}>
            {name}
        </button>
    </>
  )
}

export default PreviousBtn