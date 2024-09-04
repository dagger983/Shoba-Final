import React from 'react'
import "./Contact.css"
import Footer from "../Footer/Footer"
const Contact = () => {
  return (
    <>
     <h2 className='contactus-head'>Contact Us</h2>
      <div className="contactus">    
        <div>
          <form action="">
            <label htmlFor="name">Name</label> <br />
            <input type="text" placeholder='Name' required/> <br />
            <label htmlFor="phone">Phone</label>  <br />
            <input type="tel" name="phone" placeholder='Phone Number' required/> <br />
            <label htmlFor="email">Email</label>  <br />
           <input type="email" name='email' placeholder='Email' required/> <br />
           <button type="submit">Submit</button>
          </form>
        </div>
        <img src="/contact-us.png" alt="" />
      </div>
      <br />
      <br />
      <hr/>
      <Footer/>
    </>
  )
}

export default Contact;