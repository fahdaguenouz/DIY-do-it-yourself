import React from "react"
import { team } from "@/dummydata"

const TeamCard = () => {
  return (
    <>
      {team.map((val) => (
        <div className='items shadow'>
          <div className='img'>
            <img src={val.cover} alt='' />
            <div className='overlay'>
              <i className='fab fa-facebook-f iconn'></i>
              <i className='fab fa-twitter iconn'></i>
              <i className='fab fa-instagram iconn'></i>
              <i className='fab fa-tiktok iconn'></i>
            </div>
          </div>
          <div className='details'>
            <h2>{val.name}</h2>
            <p>{val.work}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default TeamCard
