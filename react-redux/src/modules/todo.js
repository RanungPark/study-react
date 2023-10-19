import { createAction, handleActions } from 'redux-actions';

const ADD_TO_DO = 'todo/ADD_TO_DO';
const DELETE_TO_DO = 'todo/DELETE_TO_DO';

export const addToDo = createAction(ADD_TO_DO, text => text);
export const deleteToDo = createAction(DELETE_TO_DO, id => id);


const initialstate = {
  toDos : Array.isArray(JSON.parse(localStorage.getItem('toDos'))) 
    ? JSON.parse(localStorage.getItem('toDos'))
    : [],
};

const todo = handleActions(
  {
    [ADD_TO_DO] : (state, {payload : text}) => {
      const newToDo = {text, id : Date.now()};
      localStorage.setItem('toDos', JSON.stringify([newToDo, ...state.toDos]));
      return {
        toDos : [newToDo, ...state.toDos],
      };
    },
    [DELETE_TO_DO] : (state, {payload : id}) => {
      const delToDo = state.toDos.filter(todo => todo.id !== id);
      localStorage.setItem('toDos', JSON.stringify(delToDo));
      return {
        toDos: delToDo
      };
    }
  }
  ,initialstate
)

export default todo;
