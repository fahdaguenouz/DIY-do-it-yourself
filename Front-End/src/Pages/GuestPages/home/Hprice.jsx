import React from "react"
import Heading from "../common/heading/Heading.jsx"
import PriceCard from "../pricing/PriceCard.jsx"

const Hprice = () => {
  return (
    <>
      <section className='hprice padding'>
        <Heading subtitle='OUR PRICING' title='Pricing & Packages' />
        <div className='price containerr grid'>
        <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Hprice
