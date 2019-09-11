import { createGlobalStyle } from 'styled-components';

/* import 'react-perfect-scrollbar/dist/css/styles.css'; */
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto|Poppins:300,500,700&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  * {
    margin:0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    min-height: 100%;
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 14px 'Roboto', sans-serif;
    font-weight: 300;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
