import React from "react"
import "./footer.css"
import { Link } from "react-router-dom"
import { blog } from "@/dummydata"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='containerr flexSB'>
          <div className='left roww'>
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>The beautiful thing about learning is that no one can take it away from you. - B.B. King</span>
          </div>
          <div className='right roww'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='containerr padding'>
          <div className='box logo'>
            <h1>Do it Yourself</h1>
            <span>Break It , Fix It , Flex It </span>
            <p>Self-learning is the key to unlocking the autonomy to fix things and conquer any challenge.</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link>Services</Link></li>
              <li><Link>tutorials</Link></li>
              <li><Link>Blog</Link></li>
              <li><Link>Contact us</Link></li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          <div className='box'>
            <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val) => (
              <div className='items flexSB'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))}
          </div>
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                203 Fake St. Mountain View, San Francisco, California, USA
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +2 392 3929 210
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                info@yourdomain.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2024 All rights reserved | Do It Yourself <i className='fa fa-heart'></i> 
        </p>
      </div>
    </>
  )
}

export default Footer
