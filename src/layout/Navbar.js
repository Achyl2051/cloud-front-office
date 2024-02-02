import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope, FaHeart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { FiHome } from "react-icons/fi";
import "../assets/css/Nav.css";
import logo from "../assets/img/omby.png";

export default function Navbar() {
  const user = localStorage.getItem('user');
  console.log(user);
  const token = localStorage.getItem('token');
  const userId = JSON.parse(user);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '15px' }} />
          <Link className="navbar-brand" to="/"></Link>

          <div className="searchBar">
            <input
              className="searchBarInput"
              type="text"
              placeholder="Rechercher des annonces"
            />
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item" style={{marginTop: '0.5%', paddingTop: '0.5%'}} >
                <Link className="nav-link" to="/">
                  <FiHome />{' '}
                  <span className="link-text"></span>
                </Link>
              </li>
              <li className="nav-item" style={{marginTop: '0.5%', paddingTop: '0.5%'}} >
                <Link className="nav-link" to="/message">
                  <FaEnvelope />{' '}
                  <span className="link-text"></span>
                </Link>
              </li>
              <li className="nav-item" style={{marginTop: '0.5%', paddingTop: '0.5%'}} >
                <Link className="nav-link" to="/favoris">
                  <FaHeart />{' '}
                  <span className="link-text"></span>
                </Link>
              </li>
              <li className="nav-item" style={{marginTop: '0.5%', paddingTop: '0.5%'}} >
                <Link className="nav-link" to="/profil">
                  <FaUser />{' '}
                  <span className="link-text">Profil</span>
                </Link>
              </li>
              {user == null ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <button className="btn btn-outline-dark" type="button">
                    <FaSignInAlt />{' '}
                    <span className="link-text">Se connecter</span>
                  </button>
                </Link>
              </li>
              ) : (
              <li className="nav-item">
                <Link className="button nav-link" to="/logout">
                  {/* <button className="" type="button"> */}
                    <FaSignOutAlt />{' '}
                    <span >Deconnexion</span>
                  {/* </button> */}
                </Link>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <br />
    </div>
  );
}
