import React from 'react';
import { useQuery } from 'react-query';
import { feathCoinHistory } from '../api';

interface IChartProps {
  coinId : string,
}

const Chart = ({coinId}:IChartProps) => {
  const {isLoading, data} = useQuery(["ohicv",coinId], () => feathCoinHistory(coinId));

  return (
    <div>
      Chart
    </div>
  );
};

export default Chart;