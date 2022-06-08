import React, { useState } from 'react';
import { Link } from 'gatsby';
import { animated } from 'react-spring';

import Caret from '../Caret';
import theme from '../theme';

const ServiceListItem = props => {
  const { service, styles } = props;
  const { slug, title } = service;
  const [hover, setHover] = useState(false);

  return (
    <animated.li
      style={styles}
      className="service-list__item link"
      onMouseOver={() => setHover(true)}
      onFocus={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onBlur={() => setHover(false)}
    >
      <Link to={`/service/${slug.current}`}>{title}</Link>
      <Caret color={theme.offWhite} hover={hover} />
    </animated.li>
  );
};

export default ServiceListItem;
