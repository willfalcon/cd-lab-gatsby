import React from 'react';
import { Link } from 'gatsby';

import useSiteContext from '../SiteContext';

const Menu = () => {
  const { topics, setExpandedTopic, toggleMenu } = useSiteContext();
  console.log(topics);
  const firstTopic = topics[0].node.id;
  return (
    <ul className="main-menu">
      <li className="menu-item">
        <Link to="/about">About us</Link>
      </li>
      <li className="menu-item button">
        <button
          onClick={() => {
            setExpandedTopic(firstTopic);
            toggleMenu(false);
          }}
        >
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
