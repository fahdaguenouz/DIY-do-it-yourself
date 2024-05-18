import React from "react"
import Back from "../common/back/Back.jsx"
import PriceCard from "./PriceCard.jsx"
import "./price.css"
import Faq from "./Faq.jsx"

const Pricing = () => {
  return (
    <>
      <Back title='Choose The Right Plan' />
      <section className='price padding'>
        <div className='container grid'>
          <PriceCard />
        </div>
      </section>
      <Faq />
    </>
  )
}

export default Pricing
