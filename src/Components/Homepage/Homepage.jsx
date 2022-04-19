import React from 'react'
import './Homepage.css'
import welcome from '../Images/welcome.svg'
import { NavLink } from 'react-router-dom';

const Homepage = (user) => {
  
  return (
    <div className='home'>
        <div className='welcome-txt'>
                welcome to <i className='userName'>keepify!</i>
                <NavLink to={"/register"}  > <button type="submit" id="submit-btn" className="btn btn-dark btn-lg btn-block"><i className='sign-uptext'>sign up</i></button>
                </NavLink>

        </div>
        <div className='welcome-image'>
                <img src={welcome} style={{width:"50%"}} />
        </div>
        
    </div>
  )
}

export default Homepage