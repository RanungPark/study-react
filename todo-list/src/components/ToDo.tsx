import React from 'react';
import { IToDo, toDoState } from '../atom';
import { useSetRecoilState } from 'recoil';

const ToDo = ({text, id, category}: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onChange = (newCategory : IToDo['category']) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDos = {text, id, category : newCategory, ...oldToDos};
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
      {category !== 'TO_DO' && (<button name='TO_DO' onClick={()=>onChange('TO_DO')}>To Do</button>)}
      {category !== 'DOING' && (<button name='DOING' onClick={()=>onChange('DOING')}>Doing</button>)}
      {category !== 'DONE' && (<button name='DONE' onClick={()=>onChange('DONE')}>Done</button>)}
    </li>
  );
};

export default ToDo;