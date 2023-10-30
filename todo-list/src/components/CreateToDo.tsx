import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atom';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const handleValid = ({toDo} : IForm) => {
    setToDos((prev) => [{text: toDo, id: Date.now(), category: category },...prev]);
    setValue("toDo", "");
  }

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input 
        {...register('toDo',{
          required: "please write a To Do"
        })} 
        placeholder='Write a to do'
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;