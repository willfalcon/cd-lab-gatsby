import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import CloseButton from './CloseButton';
import Button from './Button';
import { useOnClickOutside } from './utils';
import { media } from './theme';

const InlineNote = props => {
  const { mark, children } = props;

  const [noteOpen, toggleNote] = useState(false);
  const noteRef = useRef();

  useOnClickOutside(noteRef, () => toggleNote(false));

  return (
    <NoteHighlight className="note-highlight">
      <button className="note-highlight__button" onClick={() => toggleNote(!noteOpen)}>
        {children}
        <NoteIcon aria-label="Read note">i</NoteIcon>
      </button>
      {noteOpen && (
        <ExpandedNote className="note" ref={noteRef}>
          {mark.text}
          <CloseButton tiny handleClick={() => toggleNote(false)} />
        </ExpandedNote>
      )}
    </NoteHighlight>
  );
};

const ContentLink = props => {
  const {
    mark: { pageLink, href, buttonStyles },
    children,
  } = props;
  if (pageLink) {
    const type = pageLink._type;
    const path = (() => {
      switch (type) {
        case 'homePage':
          return '';
        case 'aboutPage':
          return '';
        case 'blogPage':
          return '';
        case 'latestCollection':
          return 'collection';
        case 'servicesPage':
          return '';
        case 'workPage':
          return '';
        case 'category':
          return 'service';
        case 'post':
          return 'post';
        case 'collection':
          return 'collection';
        case 'project':
          const service = pageLink.categories.length ? pageLink.categories[0] : false;
          return `service/${service.slug.current}`;
        default:
          return '';
      }
    })();
    const slug = (() => {
      switch (type) {
        case 'homePage':
          return '';
        case 'aboutPage':
          return 'about';
        case 'blogPage':
          return 'blog';
        case 'workPage':
          return 'work';
        default:
          return pageLink.slug.current;
      }
    })();

    const to = `${path ? `/${path}` : ''}${slug ? `/${slug}` : ''}`;
    return buttonStyles ? (
      <Button className="content-button" to={to}>
        {children}
      </Button>
    ) : (
      <Link to={to}>{children}</Link>
    );
  }
  return buttonStyles ? <Button href={href}>{children}</Button> : <a href={href}>{children}</a>;
};

const NoteHighlight = styled.span`
  color: ${({ theme }) => theme.orange};
  cursor: pointer;
  position: relative;
  display: block;
  :hover {
    text-decoration: underline;
  }
  .note-highlight__button {
    background: transparent;
    border: 0;
    display: inline;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    text-align: inherit;
    font: inherit;
    -webkit-appearance: none;
  }
`;

const ExpandedNote = styled.span`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  color: ${({ theme }) => theme.dark};
  padding: 1rem;
  padding-right: 1.5rem;
  ${media.break`
    width: 50%;
    transform: translateY(-15px);
  `}
  .note-highlight & {
    line-height: 1.15;
    font-size: 1.4rem;
    margin: 0;
  }
`;

const NoteIcon = styled.span`
  font-style: italic;
  color: ${({ theme }) => theme.orange};
  vertical-align: top;
  background: transparent;
  border: 0;
  font-size: 1.1rem;
`;

export { InlineNote, ContentLink };
