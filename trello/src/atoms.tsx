import { atom, selector } from 'recoil';

export const minuteState = atom({
  key: 'minutes',
  default: 0,
})

export const hoursState = selector<number>({
  key: 'hours',
  get: ({get}) => {
    const minute = get(minuteState);
    return minute / 60;
  },
  set: ({set}, newValue) => {
    const minute = Number(newValue) * 60;
    set(minuteState, minute);
  }
})