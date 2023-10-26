import React from 'react';
import { useQuery } from 'react-query';
import { fetchCoinTickers } from '../api';
import { AiOutlineRise, AiOutlineFall } from 'react-icons/ai'
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`

const PriceResult = styled.div`
`

const PriceName = styled.div`
`

const PriceBox = styled.div<{isSign : string}>`
  background-color: ${props => props.theme.boxColor};
  text-align: center;
  font-size: 35px;
  padding: 20px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  color: ${props => props.isSign === 'plus' ? '#2e86de' : props.isSign === 'minus' ? '#ee5253' : ''};

  ${PriceName} {
    color: ${props => props.theme.textColor};
    font-size: 15px;
    margin-bottom: 10px;
  }

  ${PriceResult} {
    display:flex;
    text-align: center;
    justify-content: center;
    gap: 10px;
    font-weight: bold;
  }
`


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

interface IPriceProps {
  coinId: string;
}

const signDecision = (data : number) => (
  data > 0 ? 'plus' : 'minus'
)

const Price = ({coinId}:IPriceProps) => {
  const {isLoading, data} = useQuery<IPriceDate>(['price', coinId], () =>fetchCoinTickers(coinId))

  const priceObject = [
    {
      name : 'from 15 minutes ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_15m)),
      data : data?.quotes.USD.percent_change_15m,
    },
    {
      name : 'from 30 minutes ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_30m)),
      data : data?.quotes.USD.percent_change_30m,
    },
    {
      name : 'from 1 hour ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_1h)),
      data : data?.quotes.USD.percent_change_1h,
    },
    {
      name : 'from 6 hour ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_6h)),
      data : data?.quotes.USD.percent_change_6h,
    },
    {
      name : 'from 12 hour ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_12h)),
      data : data?.quotes.USD.percent_change_12h
    },
    {
      name : 'from 24 hour ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_24h)),
      data : data?.quotes.USD.percent_change_24h,
    },
    {
      name : 'from 7 day ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_7d)),
      data : data?.quotes.USD.percent_change_7d,
    },
    {
      name : 'from 30 day ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_30d)),
      data : data?.quotes.USD.percent_change_30d,
    },
    {
      name : 'from 1 year ago',
      sign : signDecision(Number(data?.quotes.USD.percent_change_1y)),
      data : data?.quotes.USD.percent_change_1y,
    },
  ]
  
  
  return (
    <div>
      { 
        isLoading ? 'Loding...' : (
        <Container>
          {
            priceObject.map(price => (
              <PriceBox isSign={price.sign}>
                <PriceName>
                  {price.name}
                </PriceName>
                <PriceResult>
                  {price.data}%
                  {price.sign === 'plus' ? <AiOutlineRise/> : price.sign === 'minus' ? <AiOutlineFall/> : <></>}
                </PriceResult>
              </PriceBox>
            ))
          }
        </Container>
        ) 
      }
    </div>
  );
};

export default Price;