import React, { useState } from 'react';
import './Login.css'; 
import img from "../Assets/Illustration.svg";
import img1 from "../Assets/chats.svg"
import { useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Registration from './Registration';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      try {
        const response = await fetch('http://13.228.165.0/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.status === 200) {
          console.log('Response:', response);
          const loginResponse = await response.json();
          console.log('Login Response:', loginResponse);
          if (loginResponse && loginResponse.token) {
            const token = loginResponse.token;
            localStorage.setItem('token', token);
            navigate('/dashboard');
          } else {
            alert('Unexpected response from the server');
          }
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('API request failed:', error);
      }
    } else {
      alert('Please fill in both email and password fields.');
    }
  };
  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">
          <h1>LOGO<span>IPSUM</span></h1>
          <img src={img} alt="Connecting Talent" />
         

          <p className="imgtext">Connecting Talent,
            <br />Fostering Growth</p>

          
          <p id="description">
           Fostering a Positive work culture,and ensuring <br />compliance with employment laws and regulations.
          </p>
        </div>
      </div>
      <div className="right-section">
        <div className="login-form">
          <h2 className="form-heading">Get Started Now</h2>
          <p className="form-heading">Enter your credentials to access your account</p>
          <form>
          <div className="form-group">
  <label htmlFor="email"  className='formlable'>Email address*</label>
  <input
                type="email"
                id="email"
                placeholder="abc@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
</div>

            <div className="form-group">
            <label htmlFor="password" className='formlable'>Password*</label>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="*********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="password-toggle"
          onClick={togglePasswordVisibility}
        />
            </div>
            <div className="form-options">
              <div className='abc'>             
              <input type="checkbox" /> 
               <label htmlFor='checkbox' className="checkbox-label">Remember&nbsp;me
              </label>
              </div>
              <div>

              <a href="/" className="forgot-password">
                Forgot your password
              </a>
              </div>
            </div>
            <button className="login-button" type="submit" onClick={handleLogin}>
              Login
            </button>
            <p>Don't have an account? <Link to="/register"><span className='signup'>Sign up</span></Link></p>
          </form>
        </div>
       
<div className="xyz">

        <img src={img1} alt=" Chat" id='messageicon' />
</div>
        
      </div>
    </div>
  );
}

export default Login;
