import React from 'react';
import { useRecoilValue } from 'recoil';
import { toDoState } from '../atom';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const ToDoList = () => {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <br />
      <CreateToDo />
      <ul>
        {toDos.map(toDo => (<ToDo key={toDo.id} {...toDo}/>))}
      </ul>
    </div>
  );
};

export default ToDoList;