import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`

const Input = styled.input.attrs({required: true, maxLength: 10})`
  background-color: tomato;
`
export default function App() {
  return (
    <Father>
      <Input />
      <Input />
    </Father>
  );
}

