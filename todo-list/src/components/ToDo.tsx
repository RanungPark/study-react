import React from 'react';
import { IToDo, toDoState, categoryState, categoriesState } from '../atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const LiBox = styled.li`
  list-style: none;
`

const ToDoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0;
  border-bottom: 0.1px solid ${props => props.theme.textColor};
`

const ToDoText = styled.span`
  font-size: 16px;
`

const CategoryButtonGrup = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-top: 10px;
`

const CategoryButton = styled.button`
  height: 20px;
  overflow: hidden;
  font-size: 9px;
  background-color: ${props => props.theme.bgColor};
  cursor: pointer;
  color: ${props => props.theme.textColor};
  border: 0;
  opacity: 0.5;
`
const CategoryDeleteButton = styled(CategoryButton)`
  color: #e84118;
  opacity: 0.8;
`

const ToDo = ({text, id}: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const usingCategory = useRecoilValue(categoryState);
  const categories = useRecoilValue(categoriesState);

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

  const onDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter(todo => todo.id !== id);
      return newToDos
    })
  }

  return (
    <LiBox>
      <ToDoBox>
        <ToDoText>{text}</ToDoText>
        <CategoryButtonGrup>
          {categories.filter(
          category => 
          category !== usingCategory
          ).map(
            moveCategory => 
            <CategoryButton onClick={()=>onChange(moveCategory as any)}>#{moveCategory}</CategoryButton>
            )}
          <CategoryDeleteButton onClick={()=>onDelete()}>#Delte</CategoryDeleteButton>
        </CategoryButtonGrup>
      </ToDoBox>
    </LiBox>
  );
};

export default ToDo;