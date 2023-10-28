import React from 'react';
import { useForm } from "react-hook-form";

interface IForm {
  toDo : string;
}

const ToDoList = () => {
  const { register, handleSubmit, formState: {errors}} = useForm<IForm>({defaultValues: {toDo :'todo'}});
  
  const onValid = (data : any) => {
    console.log(data);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {required: 'please write todo', minLength: {value: 5, message:'length to short'}})}placeholder='Write a to do'/>
        <span>
          {errors?.toDo?.message}
        </span>
        <button>
          Add
        </button>
      </form>
    </div>
  );
};

export default ToDoList;