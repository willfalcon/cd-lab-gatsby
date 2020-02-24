import React from 'react';
import { Link } from 'gatsby';

// import useSiteContext from '../SiteContext';

const Menu = () => {
  // const { toggleMenu, topics } = useSiteContext();

  return (
    <ul className="main-menu">
      <li className="menu-item">
        <Link to="/about">About us</Link>
      </li>
      <li className="menu-item button">
        <button>
          <span>What We Do</span>
        </button>
      </li>
      <li className="menu-item">
        <Link to="/work">Work</Link>
      </li>
      <li className="menu-item">
        <Link to="/blog">Blog</Link>
      </li>
    </ul>
  );
};

export default Menu;
