import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`

const Btn = styled.button`
  background-color: tomato;
  color: white;
  border: none;
  border-radius: 15px;
`
export default function App() {
  return (
    <Father>
      <Btn>Log in</Btn>
      <Btn as='a' href='/'>Log in</Btn>
    </Father>
  );
}

