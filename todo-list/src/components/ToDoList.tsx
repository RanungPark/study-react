import React from 'react';
import { useRecoilValue } from 'recoil';
import { toDoSelector } from '../atom';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import styled from 'styled-components';
import Category from './Category';

const Conteiner = styled.div`
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
  padding: 0px 20px;

  ul {
    padding-bottom: 20px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
`

const HeaderTitle = styled.h1`
  font-size: 48px;
  flex: 1;
  display: flex;
  justify-content: center;
  margin-left: 48px;
`

const ToggleThemeButton = styled.button`
  width: 48px;
  height: 48px;
`

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <Conteiner>
      <Header>
        <HeaderTitle>
          To Dos
        </HeaderTitle>
        <ToggleThemeButton>
          toggle
        </ToggleThemeButton>
      </Header>
      <Category />
      <CreateToDo />
      <ul>
        {toDos?.map((toDo) => (<ToDo key={toDo.id} {...toDo} />))}
      </ul>
    </Conteiner>
  );
};

export default ToDoList;