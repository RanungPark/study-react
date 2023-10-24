import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.backgroundColor};
  `
const Tittle = styled.h1`
  color:  ${props => props.theme.textColor};;
`  
const App = () => {
  return (
    <Wrapper>
      <Tittle>
        Hello
      </Tittle>
    </Wrapper>
  );
};

export default App;