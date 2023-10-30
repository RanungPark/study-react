import React from 'react';
import { IToDo, toDoState,  Categories } from '../atom';
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
      {category !== Categories.TO_DO  && (<button  onClick={()=>onChange(Categories.TO_DO)}>To Do</button>)}
      {category !== Categories.DOING && (<button  onClick={()=>onChange(Categories.DOING)}>Doing</button>)}
      {category !== Categories.DONE && (<button  onClick={()=>onChange(Categories.DONE)}>Done</button>)}
    </li>
  );
};

export default ToDo;