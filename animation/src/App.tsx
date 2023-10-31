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
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  exit: {
    y: 100,
    scale: 0,
    opacity: 0,
  }
}

const App = () => {
  const [showing, setShowing] = useState(false);

  const onToggle = () => {
    setShowing(prev => !prev)
  }

  return (
    <Wrapper>
      <button onClick={onToggle}>click</button>
      <AnimatePresence>
        {showing ? 
        <Box 
          variants={boxVariants}
          initial='initial'
          animate='animate'
          exit='exit'
        /> : null}
      </AnimatePresence>
    </Wrapper>
  );
};

export default App;