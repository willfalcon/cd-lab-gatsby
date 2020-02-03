import styled from 'styled-components';
import { rgba } from 'polished';

import { media, grid } from '../theme';

const StyledPeople = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
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

export { StyledPeople };
