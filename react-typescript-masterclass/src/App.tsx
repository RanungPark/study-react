import React, { useState } from 'react';
import Router from './routes/Router';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools'
import { darkTheme, lightTheme } from './theme';
import { BiSolidSun, BiSolidMoon} from 'react-icons/bi';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Source+Sans+3:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  * {
    box-sizing: border-box;
  }
  body {
    line-height: 1;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    font-family: 'Source Sans 3', sans-serif;

    &::-webkit-scrollbar {
    display:none;
    }

    & {
    -ms-overflow-style: none;
    scrollbar-width: none;  
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

const ToggleBox = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 0;
  background-color: ${props => props.theme.accentColor};
  color:  ${props => props.theme.bgColor};
  font-size: 25px;
  display:flex;
  align-items: center;
  justify-content: center;
`
const App = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((currnet) => !currnet);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ToggleBox onClick={toggleTheme}>{isDark ? <BiSolidSun/> : <BiSolidMoon/>}</ToggleBox>
      <GlobalStyle/>
      <Router />
      <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
  );
};

export default App;