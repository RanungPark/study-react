import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Tittle = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`

const Loding = styled.span`
  text-align: center;
  display: block;
`

interface RouteParams {
  coinId : string;
}

interface RouteState {
  name : string;
}

const Coin = () => {
  const [loding, setLoding] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const {state} = useLocation<RouteState>();  
  
  return (
    <Container>
      <Header>
        <Tittle>
          {state?.name || 'Loding...'}
        </Tittle>
      </Header>
      {
        loding ? <Loding>Loding...</Loding> : null
      }
    </Container>
  );
};

export default Coin;