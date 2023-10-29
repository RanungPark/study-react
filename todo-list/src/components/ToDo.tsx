import React from 'react';
import { IToDo } from '../atom';

const ToDo = ({text, id, category}: IToDo) => {
  const onChange = (event : React.MouseEvent<HTMLButtonElement>) => {
    const {currentTarget : {
      name
    }} = event

  console.log(name);

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