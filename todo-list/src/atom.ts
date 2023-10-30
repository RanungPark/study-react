import { atom, selector } from 'recoil';

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoriesState = atom({
  key: 'categoies',
  default: ["TO_DO","DOING","DONE"],
})

export const categoryState = atom({
  key: 'category',
  default: "TO_DO",
})

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
})

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({get}) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(toDo => toDo.category === category)
  }
})