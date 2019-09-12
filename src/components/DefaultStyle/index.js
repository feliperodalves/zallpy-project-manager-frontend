import styled from 'styled-components';
import {
  Form as FormR,
  Input as InputR,
  Select as SelectR,
} from '@rocketseat/unform';

export const CardContainer = styled.div`
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 40, 100, 0.12);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const Input = styled(InputR)`
  background: #fff;
  height: 42px;
  padding: 6px 12px;
  color: #495057;
  font-size: 0.899rem;
  width: 100%;
  border: 1px solid rgba(0, 40, 100, 0.12);
  border-radius: 4px;

  &::placeholder {
    color: #495057;
  }

  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.6);
    transition: box-shadow 0.15s ease-in-out;
  }
`;

export const Form = styled(FormR)`
  label {
    margin: 0 0 2px 3px;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
  }

  span {
    color: red;
    align-self: flex-start;
    margin: -13px 0 10px;
    font-size: 0.764rem;
  }
`;

export const Image = styled.img`
  width: 100%;
`;

export const Select = styled(SelectR)`
  background: rgba(0, 0, 0, 0.3);
  border: 0;
  border-radius: 4px;
  height: 44px;
  padding: 0 15px;
  color: #fff;

  margin-bottom: 10px;

  option {
    color: #333;
  }
`;
