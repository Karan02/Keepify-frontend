import React,{useState} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import loginimage from "../Images/loginimage.svg";

const Login = ({setUser,user}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  let navigate = useNavigate();
 async function submithandler(event)
  {
    event.preventDefault()
    console.log(email);
    console.log(password);
		const response = await fetch('http://localhost:3001/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			// window.location.href = '/dashboard'
      setUser(true);
      navigate("/notes");
      console.log(localStorage.getItem('token'));
		} else {
			alert('Please check your username and password')
		}
    
    
  }

  return (
    <div className="formcontainer" >
    <form className="loginform" onSubmit={submithandler}>
        <div className="form-title">    
        <h3>Log in</h3>
        </div>
        <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" onChange={(e)=>{setEmail(e.target.value,console.log(email))}} placeholder="Enter email"  required/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}  required/>
        </div>


        <button type="submit" id="submit-btn" className="btn btn-dark btn-lg btn-block" >Sign in</button>
       <NavLink to={"/register"} style={{color:"#2f2e41"}} > New user? click here</NavLink>
    </form>
      <div className="loginpicture" >
        <img src={loginimage} />
      </div>
    </div>
  )
}

export default Login