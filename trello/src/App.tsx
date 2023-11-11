import React, { FormEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hoursState, minuteState } from './atoms';

const App = () => {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hoursState);

  const onMinutesChange = (event: FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value)
  }

  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type='number' placeholder='Minutes'/>
      <input value={hours} type='number' placeholder='Hours'/>
    </div>
  );
};

export default App;