import React, { useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import Person from './Person';

import { media, grid } from '../theme';
import useSiteContext from '../SiteContext';

const People = ({ people: rawPeople }) => {
  const [expandedPerson, setExpandedPerson] = useState(null);

  const { viewport } = useSiteContext();

  const handleExpand = id => {
    setExpandedPerson(id);
  };

  const handleClose = () => {
    setExpandedPerson(null);
  };

  const people = rawPeople.map(person => ({
    ...person.node,
  }));

  const indexedPeople = people.map((person, index) => ({
    accumulatedIndex: index,
    ...person,
  }));

  const size = viewport.width / 2;

  const height =
    people.length % 2 === 0
      ? size & ((people.length / 2) * size)
      : ((people.length + 1) / 2) * size;

  return (
    <StyledPeopleWrapper
      className="people"
      expanded={expandedPerson !== null}
      height={height}
    >
      <StyledPeople expanded={expandedPerson} className="people-list">
        {indexedPeople
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
        {indexedPeople
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
  height: ${({ height }) => height}px;
  ${media.break`
    /* position: ${({ expanded }) => (expanded ? 'initial' : 'relative')}; */
    position: initial;
    height: 100%;
  `}
`;

const StyledPeople = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  /* display: flex; */
  /* flex-flow: row wrap;
  align-items: flex-start; */
  position: relative;
  ${media.break`
    background: ${props => props.theme.orange};
    position: initial;
    height: 100%;
    .person-bg-overlay {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: ${({ expanded }) => (expanded !== null ? '100vw' : 0)};
      height: ${({ expanded }) => (expanded !== null ? '100vh' : 0)};
      background: ${({ theme }) => rgba(theme.dark, 0.65)};
      mix-blend-mode: multiply;
      z-index: ${({ expanded }) => (expanded !== null ? 5 : 0)};
    }
    ${grid.enabled`
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(9, 1fr);
      grid-template-areas:
        "    .   person1 person1    .       .   " 
        "    .   person1 person1 person2 person2" 
        "primar1 primar1 primar1 person2 person2" 
        "primar1 primar1 primar1 primar2 primar2" 
        "primar1 primar1 primar1 primar2 primar2" 
        "    .      .    person4 person4    .   " 
        "person5 person5 person4 person4    .   " 
        "person5 person5    .    person3 person3" 
        "    .       .      .    person3 person3"; 

      background: transparent;
    
      &::after {
        display: block;
        content: '';
        height: 100%;
        width: 100%;
        background: ${({ theme }) => theme.orange};
        z-index: 0;
        grid-column: 2 / -1;
        grid-row : 1 / -1;
      }
      display: grid;
      
      justify-items: end;
      .primary-1 {
        grid-area: primar1;
      }
      .primary-2 {
        grid-area: primar2;
        justify-self: start;
      }
    `}
  `}
  ${media.large`
    ${grid.enabled`
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(8, 1fr);
      grid-template-areas: 
        "   .       .       .    person1 person1    .       .   "
        "primar1 primar1 primar1 person1 person1    .       .   "
        "primar1 primar1 primar1 primar2 primar2 primar2    .   "
        "primar1 primar1 primar1 primar2 primar2 primar2    .   "
        "   .    person2 person2 primar2 primar2 primar2    .   "
        "   .    person2 person2 person4 person4    .       .   "
        "person5 person5    .    person4 person4 person3 person3"
        "person5 person5    .       .       .    person3 person3";
    `}
  `}
`;

export default People;
