import React, { useState ,useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import {GiHamburgerMenu,GiCancel} from 'react-icons/gi'
import './Sidebar.css'
const Sidebar = ({user,SidebarData}) => {
 const [open,setOpen] = useState(false);
 const menubutton2 = 'menu-button2';
 const close = 'close';

 const [cname,setCname] = useState('sidebar');
  const showmenu = (e) => {
    e.preventDefault();
      setOpen(!open);
      if(open)
      {
          setCname('sidebar2');
          return;
      }
      setCname('sidebar');
  }

  return (
    <React.Fragment>
       <div className='sidebar-menu'> 
       <GiHamburgerMenu onClick={showmenu} className='menu-button' /> 
     
       </div>
        <div className={cname} >
        <GiCancel onClick={showmenu} className={menubutton2} />
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