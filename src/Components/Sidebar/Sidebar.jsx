import React, { useState ,useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'
const Sidebar = ({user,SidebarData}) => {
 

  return (
    <React.Fragment>
        <div className="sidebar" >
            <p className='userName'>Keepify</p>
             <ul className='sidebar-list'>
              
                {/*  title: "Login",
        link : "/",
        icon : <ImUser /> */}
                {SidebarData.map((val,key) =>{
                     return (

                   <NavLink  to={val.link}  className={'linktag'}  > 
                 
                   <li key={key} className="row" onClick={()=>{

                     }}>
                        <div className='icon' >{val.icon}</div>
                        <div className='title'>{val.title}</div>
                     </li></NavLink>
                     
                     );
                })} 
             </ul>
        </div>
        </React.Fragment>
  )
}

export default Sidebar