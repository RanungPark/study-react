import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { IGetMoviesResult, getAiringTodayTv, getOnTheAirTv, getPopularTv, getTopRatedTv } from '../api';
import { makeImagePath } from '../utils';
import Slider from '../Components/Slider';
import SubView from '../Components/SubView';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 250px;
`;

const Tv = () => {
  const tvTitles = ["airing_today", "on_the_air", "popular", "top_rated",]

  const { data: airingTodayData, isLoading: airingTodayLoading } = useQuery<IGetMoviesResult>(
    ["tv", "airingToday"],
    getAiringTodayTv
  );
  
  const { data: onTheAirData, isLoading: onTheAirisLoading } = useQuery<IGetMoviesResult>(
    ["tv", "onTheAir"],
    getOnTheAirTv
  );
  
  const { data: popularData, isLoading: popularisLoading } = useQuery<IGetMoviesResult>(
    ["tv", "popular"],
    getPopularTv
  );
  
  const { data: topRatedData, isLoading: topRatedisLoading } = useQuery<IGetMoviesResult>(
    ["tv", "topRated"],
    getTopRatedTv
  );

  const tvLoading = airingTodayLoading || onTheAirisLoading || popularisLoading || topRatedisLoading

  return (
    <Wrapper>
      <Helmet>
        <title>
         {tvLoading ? 'Loding...' : "woongFlix-tv"}
        </title>
      </Helmet>
      {tvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(popularData?.results[0].backdrop_path || "")}
          >
            <Title>{popularData?.results[0].original_name}</Title>
            <Overview>{popularData?.results[0].overview}</Overview>
          </Banner>
          <SliderBox>
            <Slider data={airingTodayData} title={tvTitles[0]} type='tv'/>
            <Slider data={onTheAirData} title={tvTitles[1]} type='tv'/>
            <Slider data={popularData} title={tvTitles[2]} type='tv'/>
            <Slider data={topRatedData} title={tvTitles[3]} type='tv'/>
          </SliderBox>
          <SubView data={airingTodayData} title={tvTitles[0]} type='tv'/>
          <SubView data={onTheAirData} title={tvTitles[1]} type='tv'/>
          <SubView data={popularData} title={tvTitles[2]} type='tv'/>
          <SubView data={topRatedData} title={tvTitles[3]} type='tv'/>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;