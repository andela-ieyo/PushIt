import React from 'react';

const LoginPage = () => (
  <div className="jumbotron text-center">
    <h1><span className="fa fa-lock" /> Push It</h1>

    <p>Login or Register with:</p>

    <a href="/auth/google" className="btn btn-danger">
      <span className="fa fa-google-plus" />
      Google
    </a>
  </div>
);

export default LoginPage;
