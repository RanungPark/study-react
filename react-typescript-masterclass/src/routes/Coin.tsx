import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';

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

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.5);
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
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`

const Tab = styled.div<{isActive : boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0,0,0,0.5);
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
  const [loding, setLoding] = useState(true);
  const { coinId } = useParams<IRouteParams>();
  const { state } = useLocation<IRouteState>();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceDate>();

  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");
  
  useEffect(()=> {
    ( async () => {
        const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
        const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
        setInfo(infoData);
        setPriceInfo(priceData);
        setLoding(false);
    })()
  },[coinId]);
  return (
    <Container>
      <Header>
        <Tittle>
          {state?.name ? state.name : loding ? 'Loding...' : info?.name}
        </Tittle>
      </Header>
      {
        loding ? <Loding>Loding...</Loding> : 
        <>
          <OverView>
            <OverViewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Open Source:</span>
              <span>{info?.open_source}</span>
            </OverViewItem>
          </OverView>
          <Description>{info?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverViewItem>
          </OverView>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/chart`}>
              <Chart />
            </Route>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
          </Switch>
        </>
      }
    </Container>
  );
};

export default Coin;