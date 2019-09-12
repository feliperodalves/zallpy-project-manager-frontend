import styled from 'styled-components';
import { darken } from 'polished';

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 940px;
  margin: 50px auto;

  color: #333;
  font-size: 30px;
  font-weight: bold;

  a {
    font-size: 18px;
    color: #777;

    &:hover {
      color: #008f1f;
    }
  }
`;

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
    color: #333;
  }

  button {
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
