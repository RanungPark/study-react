import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { useHistory } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { TbMovieOff } from 'react-icons/tb';

const Wrapper = styled(motion.div)`
  position: relative;
  top: -100px;
`;

const Title = styled.p`
  font-size: 26px;
  font-weight: bold;
  margin: 10px;
  text-transform: uppercase;
`

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Arrow = styled(motion.div)<{ arrowRight : boolean}>`
  position: absolute;
  z-index: 100;
  height: 200px;
  width: 50px;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.4);
  right: ${props => props.arrowRight ? 0 : null};
  opacity: 0;
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

const rowVariants = {
  hidden:(back: boolean) => ({
    x: back ? window.innerWidth + 5 : -window.innerWidth - 5,
  }),
  visible: {
    x: 0,
  },
  exit:(back: boolean) => ({
    x: back ? -window.innerWidth - 5 : window.innerWidth + 5
  }),
};

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

interface ISliderProps {
  data: IGetMoviesResult | undefined,
  title: string,
  type: string,
}

const Slider: React.FC<ISliderProps> = ({data, title, type}) => {
  const history = useHistory();
  const onBoxClicked = (movieId: number) => {
    history.push(`/woongflix/${type}/${title}/${movieId}`);
  };
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setBack(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setBack(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const [arrowBoxHover, setArrowBoxHover] = useState(false);
  const [arrorLeftHover, setArrowLeftHover] = useState(true);
  const [arrorRightHover, setArrowRightHover] = useState(true);

  const rowRef = useRef<HTMLDivElement>(null);
  const arrowLeft = rowRef.current?.firstElementChild;
  const arrowRigth = rowRef.current?.lastElementChild;

  arrowLeft?.addEventListener('mouseover', () => setArrowLeftHover(false));
  arrowLeft?.addEventListener('mouseleave', () => setArrowLeftHover(true));
  
  arrowRigth?.addEventListener('mouseover', () => setArrowRightHover(false));
  arrowRigth?.addEventListener('mouseleave', () => setArrowRightHover(true));

  return (
    <Wrapper
    onMouseOver={() => setArrowBoxHover(true)}
    onMouseLeave={() => setArrowBoxHover(false)}
    > 
      <Title>
        {title.replace(/_/g, " ")}
      </Title>
    <Arrow
      onClick={decreaseIndex}
      animate={{opacity: arrowBoxHover && arrorLeftHover ? 1 : 0}}>
      <AiOutlineLeft />
    </Arrow>
    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
      <Row
        ref={rowRef}
        variants={rowVariants}
        custom={back}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "tween", duration: 1 }}
        key={index}
      >
        {data?.results
          .slice(offset * index, offset * index + offset)
          .map((movie) => (
            <Box
              layoutId={title+movie.id}
              key={movie.id}
              whileHover="hover"
              initial="normal"
              variants={boxVariants}
              onClick={() => onBoxClicked(movie.id)}
              transition={{ type: "tween" }}
              bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
            >
              <NonImag>
                {movie.backdrop_path ? "" : <><TbMovieOff/><p>This is no image</p></>}
              </NonImag>
              <Info variants={infoVariants}>
                <h4>{movie.original_name ? movie.original_name : movie.title}</h4>
              </Info>
            </Box>
          ))}
      </Row>
      <Arrow 
        arrowRight={true} 
        onClick={incraseIndex}
        animate={{opacity: arrowBoxHover && arrorRightHover ? 1 : 0}}
      >
        <AiOutlineRight/>
      </Arrow>
    </AnimatePresence>
  </Wrapper>
  );
};

export default Slider;