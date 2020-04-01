import React from 'react'
import styled from 'styled-components';

const ErrorMessage = ({ error }) => {
    switch (error.type) {
        case "required": 
            return <StyledError>This field is required!</StyledError>;
        default: 
          return <StyledError>Something went wrong here!</StyledError>;
    }
}

const StyledError = styled.p`
  color: red;
`;

export default ErrorMessage;