import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoSelector } from '../atom';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const ToDoList = () => {
  const [categoly, setCategoly] = useRecoilState(categoryState);
  const toDos = useRecoilValue(toDoSelector);

  const onInput = (event : React.FormEvent<HTMLSelectElement>) => {
    const {currentTarget: {
      value
    }} = event
    setCategoly(value)
  }

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={categoly} onInput={onInput}>
        <option value='TO_DO'>To Do</option>
        <option value='DOING'>Doing</option>
        <option value='DONE'>Done</option>
      </select>
      <CreateToDo />
      <hr />
      {toDos?.map((toDo) => (<ToDo key={toDo.id} {...toDo}/>))}
    </div>
  );
};

export default ToDoList;