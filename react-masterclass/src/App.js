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
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 2rem;
    transition: font-size 1s ease-in-out, opacity 1s ease-in-out;

    &:hover {
      font-size: 5rem;
    }
    &:active {
      opacity: 0;
    }
  }
`

export default function App() {
  return (
    <Wrapper>
      <Box>
        <span>😊</span>
      </Box>
    </Wrapper>
  );
}

