import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

export const Header = styled.div`
  background: #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  padding: 15px;

  h1 {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
  }

  > button {
    padding: 0 20px;
    height: 44px;
    align-self: flex-end;
    background: #008f1f;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    &:hover {
      background: ${darken(0.05, '#008f1f')};
    }
  }
`;
