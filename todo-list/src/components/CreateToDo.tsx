import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from '../atom';

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const handleValid = ({toDo} : IForm) => {
    setToDos((prev) => [{text: toDo, id: Date.now(), category: 'TO_DO' },...prev]);
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