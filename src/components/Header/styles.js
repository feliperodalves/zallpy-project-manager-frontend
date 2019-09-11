import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  grid-area: header;
  border-bottom: 1px solid #e2e4ed;
`;

export const Content = styled.div`
  max-width: 1600px;
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > a {
    height: 100%;

    > img {
      height: 90%;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

  a {
    font-size: 20px;
    color: #fff;
    text-align: left;
    line-height: 15px;
    display: flex;

    &:hover {
      color: #008f1f;
    }
  }

  div {
    margin-left: 10px;
    border-left: 1px solid rgba(0, 0, 0, 0.3);

    button {
      font-size: 14px;
      margin-left: 10px;
      background: none;
      border: none;
      color: #999;

      &:hover {
        color: #008f1f;
      }
    }
  }
`;
