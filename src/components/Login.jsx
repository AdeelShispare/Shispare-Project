import React from 'react'
import './Login.css'
import img from '../assets/Illustration.svg'

const Login = () => {
  return (
    <div className='login-container'>
      <div className='logo-container'>
        <div className="logo-inner-container">
          <h1>LOREM <span>IPSUM</span></h1>
          <img src={img} />
          <div className='logo-text'>
            <h1>Connecting Talent,Fostering Growth</h1>
            <p>Fostering a positive work culture, and ensuring compilance with employement laws and regulations</p>
          </div>

        </div>
      </div>

      <div className='form-container'>
        <div className="form-inner-container">
          <div className="form-title">
            <h3>Get Started Now</h3>
            <p>Enter your credentials to access your account</p>
          </div>

          <form className='Login-Info'>
            <div>
              <label for="username">Username:</label>
              <input type="text" id="username" name="username" required />
            </div>


            
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>

            <div className="Checkbox-ForgetPswd-Container">
              <div className='CheckBox-Container'>
                <input type="checkbox" id="option1" name="option1" value="Option 1" />
                <label for="option" id='RememberMe-text'>Remember Me</label>
              </div>
              <div className='ForgetPswd'>
                <a href="#">Forget Password</a>
              </div>
            </div>
            <button className='btn'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login