import {legacy_createStore as createStore } from 'redux';

const ADD = 'ADD';
const DELETE = 'DELETE';

const addToDo = text => {
  return {
    type : ADD,
    text
  }
}

const deleteToDo = id => {
  return {
    type : DELETE,
    id
  }
}

JSON.parse(localStorage.getItem('toDos')) || localStorage.setItem('toDos', JSON.stringify([]));

const reducer = (state = JSON.parse(localStorage.getItem('toDos')), action) => {
  switch(action.type) {
    case ADD :
      const newTODO = {text: action.text, id: Date.now()};
      localStorage.setItem('toDos', JSON.stringify([newTODO, ...state]));
      return JSON.parse(localStorage.getItem('toDos'));

    case DELETE :
      const delToDo = state.filter(todo => todo.id !== action.id);
      localStorage.setItem('toDos', JSON.stringify(delToDo));
      return JSON.parse(localStorage.getItem('toDos'));
    default :
      return state;
  }
}

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo
}

export default store;