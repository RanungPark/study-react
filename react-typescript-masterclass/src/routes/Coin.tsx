import React from 'react';
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { Helmet } from 'react-helmet';
import { AiOutlineLeft } from 'react-icons/ai';
import Candlestick from './Candlestick';

const Container = styled.div`
  height: 100vh;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  overflow: scroll;

  &::-webkit-scrollbar {
    display:none;
    }

    & {
    -ms-overflow-style: none;
    scrollbar-width: none;  
    }
`

const Header = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
`
const TittleText = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`
const Tittle = styled.div`
  flex: 1;
  margin-right: 30px;
  text-align: center;
`

const Home = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  a{
    font-size: 30px;
    display: block;
    transition: color 0.2s ease-in-out;
    color: ${props => props.theme.boxColor};

    &:hover {
      color: ${props => props.theme.accentColor};
    }
  }
`

const Loding = styled.span`
  text-align: center;
  display: block;
`

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
`

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const Description = styled.p`
  margin: 20px 0px;
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
`

const Tab = styled.div<{isActive : boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: ${props => props.isActive ? 'bold' : 400};
  background-color: ${props => props.theme.boxColor};
  padding: 7px 0;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  
  a {
    display: block;
  }
`

interface IRouteParams {
  coinId : string;
}

interface IRouteState {
  name : string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceDate {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD : IQuotes;
  };
}

interface IQuotes {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
}

const Coin = () => {
  const { coinId } = useParams<IRouteParams>();
  const { state } = useLocation<IRouteState>();
  const chartMatch = useRouteMatch("/coin-tracker/:coinId/line-chart");
  const candlestickMatch = useRouteMatch("/coin-tracker/:coinId/candlestick");
  const priceMatch = useRouteMatch("/coin-tracker/:coinId/price");
  const { isLoading: infoLoading , data: infoData} = useQuery<IInfoData>(['info',coinId], () => fetchCoinInfo(coinId));
  const { isLoading: priceLoding , data: priceData} = useQuery<IPriceDate>(
    ['ticker',coinId], 
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || priceLoding;
  return (
    <Container>
      <Helmet>
        <title>
         {state?.name ? state.name : loading ? 'Loding...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Home>
          <Link to={'/coin-tracker'}>
            { loading ? null :<AiOutlineLeft />}
          </Link>
        </Home>
        <Tittle>
          <TittleText>
            {state?.name ? state.name : loading ? 'Loding...' : infoData?.name}
          </TittleText>
        </Tittle>
      </Header>
      {
        loading ? <Loding>Loding...</Loding> : 
        <>
          <OverView>
            <OverViewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Price:</span>
              <span>${priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Supply:</span>
              <span>{priceData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverViewItem>
          </OverView>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/coin-tracker/${coinId}/line-chart`}>Chart</Link>
            </Tab>
            <Tab isActive={candlestickMatch !== null}>
              <Link to={`/coin-tracker/${coinId}/candlestick`}>Candlestick</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/coin-tracker/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/coin-tracker/:coinId/line-chart`}>
              <Chart coinId={coinId}/>
            </Route>
            <Route path={`/coin-tracker/:coinId/candlestick`}>
              <Candlestick coinId={coinId}/>
            </Route>
            <Route path={`/coin-tracker/:coinId/price`}>
              <Price coinId={coinId}/>
            </Route>
          </Switch>
        </>
      }
    </Container>
  );
};

export default Coin;