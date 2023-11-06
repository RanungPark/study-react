import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import {AiFillStar} from 'react-icons/ai';
import { TbMovieOff } from 'react-icons/tb';
import { Helmet } from 'react-helmet';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Wapper = styled(motion.div)`
  position: fixed;
  top: 80px;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const NonImag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  font-size: 77px;
  p{
    font-size: 16px;
  }
`

const SubViewCover = styled.div<{ bgPhoto: string}>`
  width: 100%;
  background-image: linear-gradient(to top, black, transparent), url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 400px;
  background-color: gray;
`;

const SubViewHeader = styled.div` 
  display: flex;
  align-items: center;
  top: -160px;
  position: relative;
  margin-left: 50px;
`

const SubViewBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 50px;
  width: 410px;
  float: right;
  margin-right: 50px;
  gap: 10px;
`

const SubViewPoster = styled.div<{bgPhoto: string}>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  width: 250px;
  height: 400px;
`

const SubViewTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const SubViewReleaseDate = styled.p`
  padding-left:20px;
  font-size: 23px;
  top: -380px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`

const SubViewOverview = styled.p`
  padding: 20px;
  padding-right: 0;
  position: relative;
  top: -400px;
  color: ${(props) => props.theme.white.lighter};
`;

const SubViewVote = styled.p`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -420px;
  color: ${(props) => props.theme.white.lighter};
  padding-left:20px;
  font-size: 20px;
`;

const SubViewVoteCount = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  padding-top: 10px;
`;

const SubViewVoteAverage = styled.p`
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  align-items: center;
  font-size: 16px;
  padding-top: 10px;
`;

interface ISubViewProps {
  data: IGetMoviesResult | undefined,
  title: string,
  type: string
}

const SubView:React.FC<ISubViewProps> = ({data, title, type}) => {
  const bigMovieMatch = useRouteMatch<{ movieId: string }>(`/woongflix/${type}/${title}/:movieId`);
  
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  const history = useHistory();
  const onOverlayClick = () => history.goBack();

  return (
    <>
      <Helmet>
        <title>
         {clickedMovie && `woongFlix-${clickedMovie.id}`}
        </title>
      </Helmet>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <Wapper
              layoutId={title+bigMovieMatch.params.movieId}
            >
              {clickedMovie && (
                <>
                  <SubViewCover
                    bgPhoto={makeImagePath(clickedMovie.backdrop_path)}
                  >
                    <NonImag>
                      {clickedMovie.backdrop_path ? "" : <><TbMovieOff/><p>This is no image</p></>}
                    </NonImag>
                  </SubViewCover>
                  <SubViewHeader>
                    <SubViewPoster
                      bgPhoto={makeImagePath(clickedMovie.poster_path)}
                    />
                    <SubViewTitle>{clickedMovie.original_name ? clickedMovie.original_name : clickedMovie.title }</SubViewTitle>
                  </SubViewHeader>
                  <SubViewBody>
                    <SubViewReleaseDate>
                      {clickedMovie.first_air_date ? clickedMovie.first_air_date : clickedMovie.release_date}
                    </SubViewReleaseDate>
                    <SubViewOverview>{clickedMovie.overview}</SubViewOverview>
                    <SubViewVote>
                      VOTE
                      <SubViewVoteCount>Count: {clickedMovie.vote_count}</SubViewVoteCount>
                      {
                        clickedMovie.vote_average && 
                        <SubViewVoteAverage>Average: {Array(Math.ceil(Math.floor(clickedMovie.vote_average)/2)).fill(null).map((_ , index) => (
                          <AiFillStar key={index}/>
                        ))}</SubViewVoteAverage>
                      }
                    </SubViewVote>
                  </SubViewBody>
                </>
              )}
            </Wapper>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default SubView;
