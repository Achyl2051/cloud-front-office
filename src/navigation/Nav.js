import {CiChat1,CiUser,CiHeart} from 'react-icons/ci'

import "./Nav.css";

const Nav = ({ handleInputChange, query }) => {
  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search shoes."
        />
      </div>
      <div className="profile-container">
        <a href="#">
          <CiHeart className="nav-icons" />
        </a>
        <a href="#">
          <CiChat1 className="nav-icons" />
        </a>
        <a href="#">
          <CiUser className="nav-icons" />
        </a>
      </div>
    </nav>
  );
};

export default Nav;