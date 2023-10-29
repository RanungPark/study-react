import React from 'react';
import { IToDo, toDoState } from '../atom';
import { useSetRecoilState } from 'recoil';

const ToDo = ({text, id, category}: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onChange = (event : React.MouseEvent<HTMLButtonElement>) => {
    const {currentTarget : {
      name
    }} = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDos = {text, id, category : name, ...oldToDos};
      return [
        ...oldToDos.slice(0,targetIndex),
        newToDos,
        ...oldToDos.slice(targetIndex + 1),
      ];
    })
  }

  return (
    <li>
      <span>{text}</span>
      {category !== 'TO_DO' && (<button name='TO_DO' onClick={onChange}>To Do</button>)}
      {category !== 'DOING' && (<button name='DOING' onClick={onChange}>Doing</button>)}
      {category !== 'DONE' && (<button name='DONE' onClick={onChange}>Done</button>)}
    </li>
  );
};

export default ToDo;