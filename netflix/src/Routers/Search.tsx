import { useQuery } from 'react-query';
import { useLocation, useHistory } from "react-router";
import { IGetMoviesResult, getSearchMovies, getSearchTv } from '../api';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { makeImagePath } from '../utils';
import { TbMovieOff } from 'react-icons/tb';
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

const SearchBody = styled.div`
  position: relative;
  top: 100px;
`

const SearchKeyword = styled.div`
  width: 100%;
  height: 50px;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items:center;
  justify-content: center;
`

const Title = styled.p`
  font-size: 26px;
  font-weight: bold;
  margin: 10px;
  text-transform: uppercase;
`

const Row = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  height: 200px;
  margin: 30px 0;
`

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: gray;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const NonImag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  p{
    font-size: 16px;
  }
`

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const history = useHistory();

  const {data: movieData, isLoading: movieLoading} = useQuery<IGetMoviesResult>(['search', 'Moive'], ()=>getSearchMovies(keyword+""), {enabled: !!keyword});
  const {data: tvData, isLoading: tvLoading} = useQuery<IGetMoviesResult>(['search', 'tv'], ()=>getSearchTv(keyword+""), {enabled: !!keyword});

  const searchLoading = movieLoading || tvLoading
 
  const movieRow = movieData && Math.ceil(movieData?.results.length/6);
  const tvRow = tvData && Math.ceil(tvData?.results.length/6);


  return (
    <Wrapper>
      <Helmet>
        <title>
         {searchLoading ? 'Loding...' : `woongFlix-${keyword}`}
        </title>
      </Helmet>
      {searchLoading ? (
        <Loader>Loding...</Loader>
      ) : (
      <>
        <SearchBody>
          <SearchKeyword>{keyword}</SearchKeyword>
          <Title>Movie</Title>
          {
            Array(movieRow).fill(null).map((_, index) => (
              <Row key={index}>
                {movieData && movieData?.results.slice(offset * index, offset * (index + 1)).map((movie) => (
                  <Box
                    layoutId={"movie"+movie.id}
                    key={movie.id}
                    bgPhoto={makeImagePath(movie.backdrop_path, 'w500')} 
                    whileHover="hover" 
                    initial="normal"
                    variants={boxVariants}
                    onClick={() => history.push(`/woongflix/search/movie/${movie.id}`)}
                    >
                    <NonImag>
                      {movie.backdrop_path ? "" : <><TbMovieOff/><p>This is no image</p></>}
                    </NonImag>
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
              </Row>
            ))
          }
          <Title>TV</Title>
          {
            Array(tvRow).fill(null).map((_, index) => (
              <Row key={index}>
                {tvData && tvData?.results.slice(offset * index, offset * (index + 1)).map((tv) => (
                  <Box
                    layoutId={"tv"+tv.id}
                    key={tv.id}
                    bgPhoto={makeImagePath(tv.backdrop_path, 'w500')} 
                    whileHover="hover" 
                    initial="normal"
                    variants={boxVariants}
                    onClick={() => history.push(`/woongflix/search/tv/${tv.id}`)}
                    >
                    <NonImag>
                      {tv.backdrop_path ? "" : <><TbMovieOff/><p>This is no image</p></>}
                    </NonImag>
                    <Info variants={infoVariants}>
                      <h4>{tv.original_name}</h4>
                    </Info>
                  </Box>
                ))}
              </Row>
            ))
          }
        </SearchBody>
        <SubView  data={movieData} title='movie' type='search'/>
        <SubView  data={tvData} title='tv' type='search'/>
      </>
    )}
    </Wrapper>
  )  
}
export default Search;