import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, motionValue, useScroll, useTransform } from "framer-motion"

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background:linear-gradient(135deg,rgb(116, 185, 255),rgb(9, 132, 227));
`

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
`

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 35px;
  place-self: center;
`

const Svg = styled.svg`
  width: 300px;
  height: 300px;

  path {
    stroke: white;
    stroke-width: 2;
  }
`

const svg = {
  start: {
    fill:"rgba(255,255,255,0)",
    pathLength:0,
  },
  end: {
    fill:"rgba(255,255,255,1)",
    pathLength:1,
  },
}

const boxVariants = {
  initial:(isBack : boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  animate: {
    x:0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    }
  },
  exit:(isBack : boolean) => ({
    x: isBack ? 500 : -500,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    }
  })
}

const App = () => {
  const [index, setIndex] = useState(1);
  const [isBack, setIsBack] = useState(false);

  const onNext = () => {
    setIsBack(false)
    setIndex(prev => prev === 10 ? 10 : prev + 1)
  }

  const onPrev = () => {
    setIsBack(true)
    setIndex(prev => prev === 1 ? 1 : prev - 1)
  }

  return (
    <Wrapper>
      <AnimatePresence custom={isBack}>
        <Box
          custom={isBack}
          variants={boxVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          key={index}
        >
          {index}
        </Box> 
      </AnimatePresence>
      <button onClick={onPrev}>prev</button>
      <button onClick={onNext}>next</button>
    </Wrapper>
  );
};

export default App;