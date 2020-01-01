import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Link } from 'gatsby';

const Button = React.forwardRef(
  (
    { title, href, handleClick, type, className, children, big = false },
    ref
  ) => {
    if (handleClick) {
      return (
        <StyledButton
          onClick={handleClick}
          className={classNames('button button--onclick', className)}
          big={big}
          ref={ref}
        >
          {title}
          {children}
        </StyledButton>
      );
    }
    if (type) {
      return (
        <StyledButton
          type={type}
          className={classNames('button button--tradish', className)}
          big={big}
          ref={ref}
        >
          {title}
          {children}
        </StyledButton>
      );
    }
    return (
      <Link href={href}>
        <StyledLink
          className={classNames('button button--link', className)}
          big={big}
          ref={ref}
        >
          {title}
          {children}
        </StyledLink>
        ;
      </Link>
    );
  }
);

const StyledButton = styled.button`
  background: ${props => props.theme.orange};
  padding: ${({ big }) => (big ? '.75rem 5rem' : '.25rem 1.5rem')};
  color: white;
  border: 0;
  font-family: granville, serif;
  font-weight: 400;
  font-style: normal;
  font-size: 3rem;
  line-height: 1.5;
  cursor: pointer;
`;

const StyledLink = styled.a`
  background: ${props => props.theme.orange};
  padding: ${({ big }) => (big ? '.75rem 5rem' : '.25rem 1.5rem')};
  color: white;
  font-size: 3rem;
  cursor: pointer;
  line-height: 1.5;
`;

export default Button;
