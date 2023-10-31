import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion"

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BiggerBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.2);
  width: 600px;
  height: 600px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 35px;
  place-self: center;
`

const BoxVariants = {
  hover: {scale: 1, rotateZ: 90},
  tap: {scale: 1, borderRadius: "100px"},
  drag: {backgroundColor: 'rgba(253, 121, 168,1.0)',
   tranition: {
    duration:10
  }},
}

const App = () => {
  const biggerBoxRef = useRef<HTMLDivElement>(null)
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={biggerBoxRef}
          variants={BoxVariants}
          whileHover="hover"
          whileTap="tap"
          whileDrag="drag"
        >
        </Box>
      </BiggerBox>
    </Wrapper>
  );
};

export default App;