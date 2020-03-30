import React, { useState } from 'react';
import styled from 'styled-components';

const InlineNote = (props) => {

  const {mark, children} = props;

  const [noteOpen, toggleNote] = useState(false);

  console.log({props})
  return (
    <NoteHighlight className="note-highlight" onClick={() => toggleNote(!noteOpen)}>
      {children}
      <NoteIcon aria-label="Read note">i</NoteIcon>
      {noteOpen && (
        <ExpandedNote className="note">
          <p>{mark.text}</p>
        </ExpandedNote>
      )}
    </NoteHighlight>
  );
};

const NoteHighlight = styled.span`
  color: ${({ theme }) => theme.orange};
  cursor: pointer;
  position: relative;
  :hover {
    text-decoration: underline;
  }
`;

const ExpandedNote = styled.span`
  position: absolute;
  top: 100%;
  right: 0;
  /* transform: translateX(-50%); */
  background: white;
  color: ${({ theme }) => theme.dark};
  padding: 1rem;
  .note-highlight & p {
    line-height: 1.15;
    font-size: 1.4rem;
    margin: .5rem 0;
  }
`;

const NoteIcon = styled.button`
  font-style: italic;
  color: ${({ theme }) => theme.orange};
  vertical-align: top;
  background: transparent;
  border: 0;
`;

export { InlineNote };