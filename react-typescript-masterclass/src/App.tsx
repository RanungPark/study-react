import React from 'react';
import { styled } from 'styled-components';

const App = () => {
  const Wrapper = styled.div`
    background-color: ${props => props.theme.bgColor};
  `

  const Tittle = styled.h1`
    color: ${props => props.theme.textColor};
  `
  return (
    <div>
      <Wrapper>
        <Tittle>Hello</Tittle>
      </Wrapper>
    </div>
  );
};

export default App;