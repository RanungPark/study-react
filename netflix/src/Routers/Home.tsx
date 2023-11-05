import { useQuery } from "react-query";
import styled from "styled-components";
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Slider from '../Components/Slider';
import SubView from '../Components/SubView';

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


const Home = () => {
  const movieTitles = ["now_playing", "popular", "top_rated", "upcoming",]
  
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );
  
  const { data: popularData, isLoading: popularisLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );
  
  const { data: topRatedData, isLoading: topRatedisLoading } = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getTopRatedMovies
  );
  
  const { data: upcomingData, isLoading: upcomingisLoading } = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  const movieLoading = nowPlayingLoading || popularisLoading || topRatedisLoading || upcomingisLoading

  return (
    <Wrapper>
      {movieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(popularData?.results[0].backdrop_path || "")}
          >
            <Title>{popularData?.results[0].title}</Title>
            <Overview>{popularData?.results[0].overview}</Overview>
          </Banner>
          <SliderBox>
            <Slider data={nowPlayingData} title={movieTitles[0]} type='movies'/>
            <Slider data={popularData} title={movieTitles[1]} type='movies'/>
            <Slider data={topRatedData} title={movieTitles[2]} type='movies'/>
            <Slider data={upcomingData} title={movieTitles[3]} type='movies'/>
          </SliderBox>
          <SubView  data={nowPlayingData} title={movieTitles[0]} type='movies'/>
          <SubView  data={popularData} title={movieTitles[1]} type='movies'/>
          <SubView  data={topRatedData} title={movieTitles[2]} type='movies'/>
          <SubView  data={upcomingData} title={movieTitles[3]} type='movies'/>
        </>
      )}
    </Wrapper>
  );
}
export default Home;