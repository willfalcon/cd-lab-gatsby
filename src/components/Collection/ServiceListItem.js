import React, { useState } from 'react';
import { Link } from 'gatsby';

import Caret from '../Caret';
import theme from '../theme';

const ServiceListItem = ({ id, slug, title }) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      className="service-list__item link"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/service/${slug.current}`}>{title}</Link>
      <Caret color={theme.offWhite} hover={hover} />
    </li>
  );
};

export default ServiceListItem;
