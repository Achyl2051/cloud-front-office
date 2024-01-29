import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope, FaHeart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import "../assets/css/Nav.css";
import logo from "../assets/img/omby.png";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '15px' }} />
          <Link className="navbar-brand" to="/"> Ombaika-Mitady</Link>

          <div className="nav-container">
            <input
              className="form-control search-input"
              type="text"
              placeholder="Rechercher des annonces"
            />
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHome />{' '}
                  <span className="link-text">Accueil</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaEnvelope />{' '}
                  <span className="link-text">Message</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaHeart />{' '}
                  <span className="link-text">Favoris</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaUser />{' '}
                  <span className="link-text">Profil</span>
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-dark" type="button">
                  <FaSignInAlt />{' '}
                  <span className="link-text">Se connecter</span>
                </button>
              </li>

              <li className="nav-item">
                <button className="btn btn-outline-dark" type="button">
                  <FaSignOutAlt />{' '}
                  <span className="link-text">Déconnexion</span>
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <br />
      <br />
    </div>
  );
}
