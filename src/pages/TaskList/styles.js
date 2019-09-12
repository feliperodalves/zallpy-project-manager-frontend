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

  > button {
    margin: 10px 0;
    padding: 0 20px;
    height: 44px;
    align-self: flex-end;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    margin-left: 15px;
    transition: background 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #008f1f;

    &:hover {
      background: ${darken(0.05, '#008f1f')};
    }

    svg {
      margin-right: 10px;
    }
  }

  form {
    > button {
      margin: 10px 0;
      padding: 0 20px;
      height: 44px;
      align-self: flex-end;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      margin-left: 15px;
      transition: background 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      background: #008f1f;

      &:hover {
        background: ${darken(0.05, '#008f1f')};
      }

      svg {
        margin-right: 10px;
      }
    }

    input,
    textarea {
      background: rgba(0, 0, 0, 0.3);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      height: 200px;
      resize: none;
      padding: 15px;
    }
  }
`;
