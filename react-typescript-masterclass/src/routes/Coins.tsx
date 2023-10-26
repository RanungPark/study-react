import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';

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

const CoinList = styled.ul`
`

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;

  a{
    transition: color .2s ease-in;
    display: flex;
    padding: 20px;
    align-items: center;
  }

  &:hover{
    a{
      color: ${props => props.theme.accentColor};
    }
  }
`

const Tittle = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`

const Loding = styled.span`
  text-align: center;
  display: block;
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

interface ICoins {
  id: string,
  name: string,
  symbol: string,
}

const Coins = () => {
  
  const { isLoading, data } = useQuery<ICoins[]>('allCoins',fetchCoins) 

  return (
    <Container>
      <Helmet>
        <title>
          coins
        </title>
      </Helmet>
      <Header>
        <Tittle>
        Coins
        </Tittle>
      </Header>
      {
        isLoading ? <Loding>Loding...</Loding> :
        <CoinList>
        {data?.slice(0,100).map(coin => 
          <Coin key={coin.id}>
            <Link to={{
              pathname : coin.id,
              state : {
                name: coin.name,
              }
            }}>
              <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
              {coin.name} &rarr;
            </Link>
          </Coin>
        )}
      </CoinList>
      }
    </Container>
  );
};

export default Coins;