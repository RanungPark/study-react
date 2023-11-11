import { atom, selector } from 'recoil';

export const minuteState = atom({
  key: 'minutes',
  default: 0,
})

export const hoursState = selector({
  key: 'hours',
  get: ({get}) => {
    const minute = get(minuteState);
    return minute / 60;
  }
})