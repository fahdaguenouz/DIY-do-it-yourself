import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='containerr hero-header'>
          <div className='roww'>
            <Heading subtitle='WELCOME TO DIY' title='DIY Repair Revolution: Master the Art of Fixing' />
            <p>Enter a world where problems are just opportunities in disguise. Equip yourself with the knowledge to repair what's broken and enhance your skills with every fix. Your self-reliance journey starts here!.</p>
            <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
                VIEW TUTORIELS <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
