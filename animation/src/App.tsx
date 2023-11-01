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
  gap: 100px;
`

const Box = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [click, setClick] = useState(false);

  const onClick = () => setClick(prev => !prev);

  return (
    <Wrapper  onClick={onClick}>
      <AnimatePresence>
        <Box>
          {click ? <Circle layoutId='circle'/> : null}
        </Box> 
        <Box>
          {click ? null : <Circle layoutId='circle'/> }
        </Box> 
      </AnimatePresence>
    </Wrapper>
  );
};

export default App;