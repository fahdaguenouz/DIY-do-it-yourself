import TranslationWidget from "@/Translation/TranslationWidget";
import React from "react"
import { Link } from 'react-router-dom';

const Head = () => {
  return (
    <>
    
      <section className='head'>
        <div className='containerr flexSB'>
          <div className='logo'>
            <h1><Link style={{ color:"#4ab6ea" ,textDecorationLine:'none'}} to="/">Do It Yourself</Link></h1>
            <span>Break It , Fix It , Flex It </span>
          </div>

          <div className='social'>
            
            <i><TranslationWidget/></i>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
