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
  padding: 50px 20px;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    > .left {
      display: flex;
      flex-direction: column;
    }

    > div {
      display: flex;
      flex-direction: row;
    }

    h4 {
      color: #666;
      margin-bottom: 15px;
      font-weight: normal;
    }

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      padding-left: 15px;
    }

    button {
      margin: 5px 0 0;
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

      svg {
        margin-right: 10px;
      }
      &.edit {
        background: #008f1f;

        &:hover {
          background: ${darken(0.05, '#008f1f')};
        }
      }
      &.exclude {
        background: #e4605e;

        &:hover {
          background: ${darken(0.05, '#e4605e')};
        }
      }
    }
  }
`;

export const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > h4 {
    color: #666;
    margin-bottom: 15px;
    font-weight: normal;
  }

  > p {
    white-space: pre-line;
    font-size: 18px;
    line-height: 24px;
    color: #333;
    margin-bottom: 30px;
    padding-left: 15px;
  }
`;

export const AddInformationForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  button {
    padding: 0 20px;
    margin-top: 5px;
    height: 44px;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    &.user {
      background: #008f1f;

      &:hover {
        background: ${darken(0.05, '#008f1f')};
      }
    }

    &.task {
      background: #2d5ff5;

      &:hover {
        background: ${darken(0.05, '#2d5ff5')};
      }
    }

    svg {
      margin-right: 10px;
    }
  }
`;
