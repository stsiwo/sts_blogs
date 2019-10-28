import * as React from 'react';
import './Login.scss';


const Login: React.FunctionComponent<{}> = (props: {}) => {

  return (
    <div className="login-form-cover">
      <h2 className="login-form-title">Login Form</h2>
      <form className="login-form-content">
        <div className="login-form-content-item login-form-content-email">
          <label htmlFor="email" className="login-form-content-item-label">Email</label>
          <input type="email" name="email" id="email" className="login-form-content-item-input" placeholder="enter your email..." />
        </div>
        <div className="login-form-content-item login-form-content-password">
          <label htmlFor="password" className="login-form-content-item-label">Password</label>
          <input type="password" name="password" id="password" className="login-form-content-item-input" placeholder="enter your password..." />
        </div>
        <div className="login-form-content-item login-form-content-password-confirm">
          <label htmlFor="password-confirm" className="login-form-content-item-label">Password Confirm</label>
          <input type="password" name="password-confirm" id="password-confirm" className="login-form-content-item-input" placeholder="enter your password again..." />
        </div>
        <div className="login-form-content-btn-wrapper">
          <input className="regular-btn signup-form-content-btn" type="button" value="Cancel" />
          <input className="regular-btn signup-form-content-btn" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Login;


