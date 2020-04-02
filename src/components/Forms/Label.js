import styled from 'styled-components';

import { grid } from '../theme';

const Label = styled.label.attrs(() => ({
  className: 'field-label',
}))`
  position: relative;
  transition: .15s;
  border: ${({ isFocused, theme }) => `${isFocused ? '3px' : '2px'} solid ${theme.orange}`};
  margin: ${({ isFocused }) => isFocused ? '0px 0px 5px 1px' : '1px 1px 6px'}; 
  width: 100%;
  ${grid.enabled`
    grid-column: ${({ halfWidth }) => halfWidth ? 'span 1' : 'span 2'};
  `}
  .label-text {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transition: .15s;
    transform: ${({ isFocused }) => isFocused ? 'translateY(-115%)' : 'translateY(-50%)'};
    font-size: ${({ isFocused }) => isFocused && '1.2rem'};
    pointer-events: none;
    &.message-span {
      top: 0;
      transform: translateY(0);
    }
  }

  &.field-textarea {
    .label-text {
      top: 0;
      transform: translateY(0);
    }
  }

  input,
  textarea {
    background: transparent;
    border: 0;
    width: 100%;
    padding: 1rem 1rem;
    margin-bottom: 0;
    margin-top: 1rem;
    color: ${props => props.theme.dark};
    &:focus {
      outline: none;
    }
  }

  &.checkboxes,
  &.radiobuttons {
    .label-text {
      position: relative;
    }
  }
`;

export default Label;