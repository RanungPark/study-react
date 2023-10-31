import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, motionValue, useScroll, useTransform } from "framer-motion"

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background:linear-gradient(135deg,rgb(116, 185, 255),rgb(9, 132, 227));
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

const App = () => {
  const x = motionValue(0);
  const rotateZ = useTransform(x , [-800, 800], [-360, 360]);
  const gradient = useTransform(x, [-800, 0, 800], [
    'linear-gradient(135deg,rgb(85, 239, 196),rgb(0, 184, 148))', 
    'linear-gradient(135deg,rgb(116, 185, 255),rgb(9, 132, 227))', 
    'linear-gradient(135deg,rgb(162, 155, 254),rgb(108, 92, 231))'
  ])
  const {scrollYProgress} = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1,5])
  
  return (
    <Wrapper style={{background: gradient}}>
        <Box
          style={{ x, rotateZ, scale}}
          drag='x'
          dragSnapToOrigin
        />
    </Wrapper>
  );
};

export default App;