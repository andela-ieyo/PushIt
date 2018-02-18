import React from 'react';

const LoginPage = () => (
  <div className="login-wrapper">
    <div className="login-text-box">
      <h1 className="login-header-name">
        <span className="login-heading">Push It</span>
        <span className="login-heading--sub">Login or Register with:</span>
      </h1>
      <a href="/auth/google" className="btn btn-danger btn-animated">
        <span className="fa fa-google-plus" />
        Google
      </a>
    </div>
  </div>
);

export default LoginPage;
