import React from "react"
import Heading from "../common/heading/Heading"
import "./about.css"
import Awrapper from "./Awrapper.jsx"
import { homeAbout } from './../../../dummydata';

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='containerr flexSB'>
          <div className='left roww'>
            <img src='./images/about.webp' alt='' />
          </div>
          <div className='right roww'>
            <Heading subtitle='FIX ANYTHING' title='Elevate Your DIY Skills with Us' />
            <div className='items'>
              {homeAbout.map((val) => {
                return (
                  <div className='item flexSB' key={val.title}>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default AboutCard
