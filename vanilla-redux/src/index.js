import {  legacy_createStore as createStore } from 'redux';

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// number.innerText = 0;

// const ADD = "ADD";
// const MINUS = "MINUS";

// const countModifier = (count = 0, action) => {
//   switch(action.type) {
//     case ADD :
//       return count + 1;
//     case MINUS :
//       return count - 1;
//     default :
//       return count;
//   }
// };

// const countStore = createStore(countModifier);

// const onChange = () => {
//   number.innerText = countStore.getState();
// }

// countStore.subscribe(onChange);

// const handleAdd = () => {
//   countStore.dispatch({type: ADD});
// }

// const handleMinus = () => {
//   countStore.dispatch({type: MINUS});
// }

// add.addEventListener('click', handleAdd);
// minus.addEventListener('click', handleMinus);

const createTodo = toDo => {
  const li = document.createElement('li');
  li.innerText = toDo;
  ul.appendChild(li)
}

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  createTodo(toDo)
}

form.addEventListener('submit', onSubmit);