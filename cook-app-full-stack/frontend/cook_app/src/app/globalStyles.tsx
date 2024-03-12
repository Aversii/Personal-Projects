'use client';
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body,html {
    margin: 0;
    padding: 0;
    background: red;
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh; 
  }
`;
 
export default GlobalStyle;