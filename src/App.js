import Sidebar from "./Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useNavigate } from 'react-router-dom';
import Notes from "./Components/Notes/Notes";
import Todo from "./Components/Todo/Todo";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import React, {useState,useEffect } from "react";
import Register from "./Components/Signup/Register";
import jwt_decode from "jwt-decode";

import { SidebarData } from '../src/Components/Sidebar/Sidebardata'
import { SidebarData2 } from '../src/Components/Sidebar/Sidebardata2'

function App() {
  useEffect(() => {
		const token = localStorage.getItem('token')
    // console.log(token);
		if (token) {
			const user = jwt_decode(token)
			if (!user) {

				localStorage.removeItem('token')
				setUser(false);
			} else {
				// populateQuote()
        setUser(true);
			}
		}
	}, [])
  const [user,setUser] = useState(false);
  

  return (
    <div className="App">

      {
        user ?
        <React.Fragment>
        <Sidebar setUser={user} SidebarData={SidebarData} />
        <Routes>
          <Route path="/notes" element={<Notes />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/profile" element={<Profile setUser={setUser} />} />
        </Routes>
          </React.Fragment> 
         :
         <React.Fragment>
         <Sidebar setUser={user} SidebarData={SidebarData2} />
         <Routes>
         <Route path="/" element={<Login user={user} setUser={setUser} />} />
         <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
        </React.Fragment>
      }
      
         
      
      
    </div>
  );
}

export default App;
