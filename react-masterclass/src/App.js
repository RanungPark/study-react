import styled, {keyframes} from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0;
  }
  50% {
    border-radius: 50px;
  }

  100% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
`

const Box = styled.div`
  background-color: tomato;
  width: 200px;
  height: 200px;
  animation:  ${rotationAnimation} 1s linear infinite;
`

export default function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

