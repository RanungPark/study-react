import React, { useState } from 'react';
import {useQuery} from 'react-query'
import { getMovies } from '../api';

const Home = () => {
  const {isLoading, data} = useQuery(['movies',"nowplaying" ],getMovies);

  console.log(data);
  

  const[index, setIndex] = useState(0);

  const incraseIndex = () => setIndex(prev => prev + 1);
 
  return (
    <div>
      {isLoading ? (
        <div>...loading</div>) : (
          <div>
            {data?.results[0].title}
            {data?.results[0].overview}
          </div>
      )}
    </div>
  );
};

export default Home;