import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'

// export const addToDoToolkit = createAction("todoToolkit/ADD_TO_DO_TOOLKIT");
// export const deleteToDoToolkit = createAction("todoToolkit/delete_TO_DO_TOOLKIT");

// // const todoToolket = (state = [], action) => {
// //   switch(action.type) {
// //     case addToDo.type : 
// //       return [{text: action.text, id: Date.now()}, ...state];
// //     case deleteToDo.type :
// //       return state.filter(todo => todo.id !== action.id);
// //     default :
// //       return state;
// //   }
// // }

const initialState = {
  todos: []
}

// const todoToolkit = createReducer(initialState, {
//   [addToDoToolkit]: (state, {payload : text}) => {
//     state.todos.push({text, id: Date.now()});
//   },
//   [deleteToDoToolkit]: (state, {payload : id}) => 
//     state.todos.filter(todo => todo.id !== id)
// })

const todoToolkitSlice = createSlice({
  name: 'todoToolkit',
  initialState,
  reducers: {
    addToDoToolkit: (state, {payload: text}) => {
      state.todos.push({text, id: Date.now()});
    },
    deleteToDoToolkit: (state, {payload : id}) => 
      state.todos.filter(todo => todo.id !== id)
  }
})

export const {addToDoToolkit, deleteToDoToolkit} = todoToolkitSlice.actions
export default todoToolkitSlice.reducer