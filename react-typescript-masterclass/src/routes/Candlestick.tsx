import React from 'react';
import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';
import { fetchCoinHistory } from '../api';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: string;
}

interface ICandlesticProps {
  coinId: string;
}

const Candlestick = ({coinId}:ICandlesticProps) => {
  const {isLoading, data} = useQuery<IHistorical[]>(
    ['CandlesickOHLCV', coinId], 
    () =>fetchCoinHistory(coinId), 
    {
    refetchInterval: 10000,
    }
  )

  const mapOHLCData = data?.map((data) => (
    {
      x: new Date(parseFloat(data.time_close) *1000).toUTCString(),
      y: [data.open, data.high, data.low, data.close]
    })) ?? [];
    const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {
        isLoading ? 'Loading...' : (<ApexChart
          type='candlestick'
          series={[{data : mapOHLCData}]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {show: false},
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {show: false},
              type: "datetime",
            },
            yaxis: {show: false},
          }}
        />)
      }
    </div>
  );
};

export default Candlestick;