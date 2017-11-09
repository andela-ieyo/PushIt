import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import { render } from 'react-dom';


const NavBar = () => (
  <div>
    <nav className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}}>
      <a className="navbar-brand" href="#">
        PushIt
      </a>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Pricing</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default NavBar;
