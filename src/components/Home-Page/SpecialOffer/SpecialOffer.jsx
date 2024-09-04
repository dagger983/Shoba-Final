import React from 'react'
import "./SpecialOffer.css"
import {Link} from "react-router-dom"
const SpecialOffer = () => {
  return (
    <>
        <div className='special'>
          <Link to="/offers">
           <div>
                <img src="./specialoffer-min.png" className='special-offer-1' alt="" />
                <img src="./specialoffer-min 2.png" className='special-offer-2' alt="" />
            </div>
          </Link>
           
            
        </div>
    </>
  )
}

export default SpecialOffer