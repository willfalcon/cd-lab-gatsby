import React from 'react';
import { Link } from 'gatsby';

const Menu = () => {
  return (
    <ul className="main-menu">
      <li className="menu-item">
        <Link to="/about">About us</Link>
      </li>
      <li className="menu-item">
        <Link to="/what-we-do">What We Do</Link>
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
