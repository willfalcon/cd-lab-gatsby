import React, { useState } from 'react';
import styled from 'styled-components';

import Person from './Person';

import { StyledPeople } from './PeopleStyles';
import { media } from '../theme';

const People = ({ people: rawPeople }) => {
  const [expandedPerson, setExpandedPerson] = useState(null);
  const handleExpand = id => {
    setExpandedPerson(id);
  };
  const handleClose = () => {
    setExpandedPerson(null);
  };

  const people = rawPeople.map(person => ({
    ...person.node,
  }));

  console.log(people);
  return (
    <StyledPeopleWrapper className="people" expanded={expandedPerson !== null}>
      <StyledPeople expanded={expandedPerson} className="people-list">
        {people
          .filter(person => person.primary)
          .map((person, index) => (
            <Person
              primary
              key={person.id}
              handleExpand={handleExpand}
              handleClose={handleClose}
              expanded={expandedPerson === person.id}
              index={index}
              {...person}
            />
          ))}
        {people
          .filter(person => !person.primary)
          .map((person, index) => (
            <Person
              key={person.id}
              handleExpand={handleExpand}
              handleClose={handleClose}
              expanded={expandedPerson === person.id}
              index={index}
              {...person}
            />
          ))}
      </StyledPeople>
    </StyledPeopleWrapper>
  );
};

const StyledPeopleWrapper = styled.div`
  padding: 0 !important;
  position: relative;
  ${media.break`
    /* position: ${({ expanded }) => (expanded ? 'initial' : 'relative')}; */
    position: initial;
    height: 100%;
  `}
`;

export default People;
