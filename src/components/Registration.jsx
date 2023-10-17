import React, { useState } from 'react';
import './Registration.css'; // Create a CSS file for styling
import img from "../Assets/Illustration.svg";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
  
    if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
      try {
        // Send registration data to your API
        const response = await fetch('http://13.228.165.0/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
  
        if (response.status === 200) {
          // Registration successful
          console.log(response.status)
          navigate('/');
        
        } else if (response.status === 409) {
          console.log(response.status)
          // User with this email already exists
          alert('User with this email already exists. Please use a different email.');
        } 
        else {
          // Handle other registration failures
          console.log(response.status)
          alert('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('API request failed:', error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };
  

  return (
    <div className="registration-container">
      <div className="left-section">
        <div className="logo">
          <h1>LOGO<span>IPSUM</span></h1>
          <img src={img} alt="Connecting Talent" />
          <p className="imgtext">Connecting Talent, Fostering Growth</p>
          <p id="description">
            Fostering a Positive work culture, and ensuring compliance with employment laws and regulations.
          </p>
        </div>
      </div>
      <div className="right-section">
        <div className="registration-form">
          <h2 className="form-heading">Create an Account</h2>
          <p className="form-heading">Fill in the details to get started</p>
          <form>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name*</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address*</label>
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
              <label htmlFor="password" className="form-label">Password*</label>
              <input
                type="password"
                placeholder="*********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="registration-button" type="submit" onClick={handleRegistration}>
              Register
            </button>
            <p>Already have an account?  <Link to="/"><span className="login">Login</span></Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
