import React from 'react';
import logo from './logo.svg';
import './App.css';
import'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div classNameName="container">
  <nav className="navbar navbar-expand navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Always expand</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarsExample02">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
    </ul>
   
  </div>
</nav>
    </div>
  );
}

export default App;
