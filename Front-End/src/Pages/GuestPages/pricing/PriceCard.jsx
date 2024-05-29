import React from "react"
import { price } from "@/dummydata"
import { useNavigate } from "react-router-dom";

const PriceCard = () => {
  const navigate=useNavigate()
  const handleButtonClick = () => {
    navigate('/login');
  };
  return (
    <>
      {price.map((val,index) => (
        <div className='items shadow' key={index}>
          <h4>{val.name}</h4>
          <h1>
            <span>$</span>
            {val.price}
          </h1>
          <p>{val.desc}</p>
          <button className='outline-btn' onClick={handleButtonClick}>GET STARTED</button>
        </div>
      ))}
    </>
  )
}

export default PriceCard
