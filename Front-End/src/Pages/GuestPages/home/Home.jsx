import React from "react"
import AboutCard from "../about/AboutCard.jsx"
import Hblog from "./Hblog.jsx"
import HAbout from "./HAbout.jsx"
import Hero from "./hero/Hero.jsx"
import Hprice from "./Hprice.jsx"
import Testimonal from "./testimonal/Testimonal.jsx"


const Home = () => {
  return (
    <>
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Hblog />
      <Hprice />
    </>
  )
}

export default Home
