import styled from 'styled-components';
import { animated } from 'react-spring';

import { media } from '../theme';

const StyledForm = styled(animated.form)`
  overflow: hidden;
  background: ${props => props.theme.offWhite};
  flex: 0 0 50%;
  position: absolute;
  left: 0;
  bottom: 42px;
  width: 100%;
  height: calc(100% - 42px);
  /* transition: 0.25s ease-out; */
  padding: ${props => (props.formOpen ? '0rem 2rem 4rem' : '0 2rem')};
  /* max-height: ${props => (props.formOpen ? '100vh' : '0')}; */
  h1 {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }
  hr {
    width: 75px;
    margin-left: 0;
    border: 1.5px solid ${props => props.theme.orange};
  }
  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
  }
  label {
    position: relative;
    transition: .15s;
    width: 100%;
    border: 2px solid ${props => props.theme.orange};
    margin: 1px 1px 6px;
    span {
      position: absolute;
      top: 50%;
      left: 0.5rem;
      transform: translateY(-50%);
      transition: .15s;
      pointer-events: none;
      &.message-span {
        top: 0;
        transform: translateY(0);
      }
    }
    &.focused {
      border-width: 3px;
      margin: 0px 0px 5px 1px;
      span {
        transform: translateY(-115%);
        font-size: 1.2rem;
        &.message-span {
          transform: translateY(-0%);
        }
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
  }
  button[type="submit"] {
    margin-right: 1rem;
  }
  .buttons {
    display: flex;
    align-items: center;
  }
  ${media.break`
    max-height: 100vh;
    position: static;
    height: 100%;
    hr {
      display: none;
    }
    h2 {
      padding: 1.5rem 1.2rem .5rem;
    }
    .cancel {
      display: none;
      display: ${({ modal }) => (modal ? 'initial' : 'none')};
    }
  `}
`;

export { StyledForm };
