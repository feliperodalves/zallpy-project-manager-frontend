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

  ul {
    margin-left: 30px;
    margin-bottom: 20px;

    li {
      span {
        color: #777;
        font-size: 14px;
      }
    }
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);

    p {
      margin-right: 30px;
      font-size: 16px;
    }

    svg {
      margin-right: 10px;
    }
  }
  button {
    margin: 5px 0 0;
    padding: 0 20px;
    height: 44px;
    align-self: flex-start;
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
`;
