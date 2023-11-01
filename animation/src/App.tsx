import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion} from "framer-motion"

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background:linear-gradient(135deg,#e09,#d0e);
  flex-direction: column;
  gap: 50px;  
`

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 15px;
`

const Overlay = styled(motion.div)`
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Box = styled(motion.div)`
  height: 300px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
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

const Button = styled(motion.button)`
  border: none;
  font-size: 16px;
  padding: 7px;
  border-radius: 5px;
  font-weight: bold;
`

const overlay = {
  initial:{
    backgroundColor: 'rgba(0,0,0,0)'
  },
  animate: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  exit: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
}

const boxVariants = {
  initial: {
    scale: 1
  },
  hover:(n : number) => ({
    scale: 1.1,
    transformOrigin:  
      n ===1 ? 'right bottom' :
      n === 2 ? 'left bottom'  :
      n === 3 ? 'right top'  :
      n === 4 ? 'left top' : 'center'
  })
}

const button = {
  initial:{
    color:"rgb(0, 151, 230)", 
    scale: 1,
  },
  tap:{
    color:"rgb(232, 65, 24)",
    scale: 1.2,
  }
}

const App = () => {
  const [id, setid] = useState<null | string>(null);
  const [circleSwitch, setCircleSwitch] = useState(false);
  const toggleCircle = () => setCircleSwitch(prev => !prev)
 
  return (
    <Wrapper  >
      <Grid>
        {
          [1,2,3,4].map(n => 
            <Box 
              custom={n}
              key={n}
              variants={boxVariants}
              initial='initial'
              whileHover='hover'
              layoutId={n + ''} 
              onClick={()=>setid(n+'')}>
              {n === 2 && (circleSwitch ? null : <Circle layoutId='circle'/>)}
              {n === 3 && (circleSwitch ? <Circle layoutId='circle'/> : null)}
            </Box>  
          )
        }
      </Grid>
      <AnimatePresence>
        {id ? 
          <Overlay 
          onClick={()=>setid(null)}
          variants={overlay}
          initial='initial'
          animate='animate' 
          exit='exit'
          >
            <Box style={{width:450, height: 300, backgroundColor:'rgba(255, 255, 255, 1)'}} layoutId={id}/>
          </Overlay> : null
        }
      </AnimatePresence>
      <Button 
        variants={button}
        initial='initial'
        whileTap='tap'
        onClick={toggleCircle}>
        Switch
      </Button>
    </Wrapper>
  );
};

export default App;