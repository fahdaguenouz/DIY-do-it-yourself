import React from "react"
import "./courses.css"
import { online } from "./../../../dummydata"
import Heading from "../common/heading/Heading"

const OnlineCourses = () => {
  return (
    <>
      <section className='online'>
        <div className='containerr'>
          <Heading subtitle='Categories ' title='Explore Our DIY Categories' />
          <div className='content grid3'>
            {online.map((val) => (
              <div className='box' key={val.courseName}>
                <div className='img'>
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt='' className='show' />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses
