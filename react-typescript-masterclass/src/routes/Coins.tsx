import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
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

const CoinList = styled.ul`
`

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;

  a{
    transition: color .2s ease-in;
    display: block;
    padding: 20px;
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

interface coinsInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

const Coins = () => {
  const [coins, setCoins] = useState<coinsInterface[]>([])
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    ( async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      setCoins(json.slice(0,99));
      setLoding(false);
    })()
  },[]);
  return (
    <Container>
      <Header>
        <Tittle>
        Coins
        </Tittle>
      </Header>
      {
        loding ? <Loding>loding...</Loding> :
        <CoinList>
        {coins.map(coin => <Coin key={coin.id}><Link to={`/${coin.id}`}>{coin.name} &rarr;</Link></Coin>)}
      </CoinList>
      }
    </Container>
  );
};

export default Coins;