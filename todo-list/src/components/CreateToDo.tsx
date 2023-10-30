import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { Categories, toDoState } from '../atom';
import styled from 'styled-components';

interface IForm {
  toDo: string;
}

const FormBox = styled.div`
  padding: 20px 0;
  span{
    margin-top: 20px;
    font-size: 10px;
  }
`

const FormStyle = styled.form`
  border: 2px solid ${props => props.theme.boxColor};
  display: flex;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
`

const FormInput = styled.input`
  font-size: 14px;
  flex: 1;
  border: 0;
  height: 40px;
  outline: none;
  box-shadow: none;
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.bgColor};
  padding-left: 10px;
`

const FormButton = styled.button`
  font-size: 12px;
  border: 0;
  height: 40px;
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.textColor};
`

const CreateToDo = () => {
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const handleValid = ({toDo} : IForm) => {
    setToDos((prev) => [{text: toDo, id: Date.now(), category: Categories.TO_DO },...prev]);
    setValue("toDo", "");
  }

  return (
    <FormBox>
      <FormStyle onSubmit={handleSubmit(handleValid)}>
        <FormInput 
          {...register('toDo',{
            required: "please write a To Do"
          })} 
          placeholder='ToDo 작성하기'
        />
        <FormButton>Add</FormButton>
      </FormStyle>
    </FormBox>
  );
};

export default CreateToDo;