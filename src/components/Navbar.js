import React from 'react';
import { Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      <Link className="navbar-brand" to="/home">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/apod">APOD</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/marsRover">Mars Rover</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/inSight">InSight: Mars Weather</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;