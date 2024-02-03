import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope, FaHeart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { FiHome, FiMessageCircle, FiUser, FiHeart, FiSearch } from "react-icons/fi";
import "../assets/css/Nav.css";
import logo from "../assets/img/omby.png";

export default function Navbar() {
  const user = localStorage.getItem('user');
  console.log(user);
  const token = localStorage.getItem('token');
  const userId = JSON.parse(user);


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['Option 1', 'Option 2', 'Option 3'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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
            <FiSearch className='searchBarIcon' />

          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-elements">
              <li className="nav-item"  >
                <Link className="nav-link" to="/">
                  <FiHome size={20} />{' '}
                  <span className="link-text"></span>
                </Link>
              </li>
              <li className="nav-item"  >
                <Link className="nav-link" to="/message">
                  <FiMessageCircle size={20} />{' '}
                  <span className="link-text"></span>
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link" to="/favoris">
                  <FiHeart size={20} />{' '}
                  <span className="link-text"></span>
                </Link>
              </li>

              {user == null ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <div className="button" type="button">
                      <span>Se connecter</span>
                    </div>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <div className="nav-link">
                    <div className="profilePdp" onClick={toggleDropdown} >
                      <img className='profilePdpImage' alt="pdp" src={'https://firebasestorage.googleapis.com/v0/b/voiture-13909.appspot.com/o/94f3282c-22c3-4095-9686-8ef44514e8cd.jpeg?alt=media&token=85866a44-8653-4c6c-b4c6-71019e731ae0'} />
                    </div>
                  </div>
                  {isOpen && (
                    <div className="dropdown-container">
                          <Link className='menu-link' to="/profil">
                            <FiUser size={20} />
                            <span>Profil</span>
                          </Link>
                          <Link className='button-logout' to="/logout">
                              <FaSignInAlt className='logout-icon' size={20} />
                              <span>Se Deconnecter</span>
                          </Link>
                    </div>
                  )}
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
