import { AnimatePresence, MotionValue, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import {AiFillStar} from 'react-icons/ai'

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Wapper = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const SubViewCover = styled.div<{ bgPhoto: string}>`
  width: 100%;
  background-image: linear-gradient(to top, black, transparent), url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 400px;
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

const SubViewOverview = styled.p`
  padding: 20px;
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
  margin:20px;
  font-size: 20px;
`;

const SubViewVoteCount = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  margin-top: 10px;
`;

const SubViewVoteAverage = styled.p`
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 10px;
`;

interface ISubViewProps {
  scrollY : number,
  data: IGetMoviesResult | undefined,
  title: string
}

const SubView:React.FC<ISubViewProps> = ({scrollY, data, title}) => {
  const bigMovieMatch = useRouteMatch<{ movieId: string }>(`/movies/${title}/:movieId`);
  
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  const history = useHistory();
  const onOverlayClick = () => history.push("/");

  return (
    <>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <Wapper
              style={{ top: scrollY + 100 }}
              layoutId={title+bigMovieMatch.params.movieId}
            >
              {clickedMovie && (
                <>
                  <SubViewCover
                    bgPhoto={makeImagePath(clickedMovie.backdrop_path)}
                  />
                  <SubViewHeader>
                    <SubViewPoster
                      bgPhoto={makeImagePath(clickedMovie.poster_path)}
                    />
                    <SubViewTitle>{clickedMovie.title}</SubViewTitle>
                  </SubViewHeader>
                  <SubViewBody>
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
