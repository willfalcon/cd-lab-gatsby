import styled from 'styled-components';

const Label = styled.label.attrs(() => ({
  className: 'field-label',
}))`
  flex: 0 0 ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .label-text {
    font-weight: ${({ theme }) => theme.font.bold};
    color: black;
    margin-bottom: 0.5rem;
  }
  input,
  textarea {
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.light};
    padding: 0.75rem 0.5rem;
  }
`;

export default Label;