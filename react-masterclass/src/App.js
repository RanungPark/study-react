import styled, {keyframes} from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;  
  background-color: ${props => props.theme.backgroundColor}
`
const Title = styled.h1`
  color : ${props => props.theme.textColor};
`

export default function App() {
  return (
    <Wrapper>
      <Title> Hello</Title>
    </Wrapper>
  );
}

