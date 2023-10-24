import React from 'react';
import Circle from './Circle';

const App = () => {
  return (
    <div>
      <Circle bgColor='tomato' borderColor='blue'/>
      <Circle bgColor='teal' text='im here'/>
    </div>
  );
};

export default App;