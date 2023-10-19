import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store';
import ToDo from '../components/ToDo';
import { addToDo } from '../modules/todo';

// const Home = ({todos, addToDo}) => {
const Home = () => {
  const [text, setText] = useState("");
  const {toDos} = useSelector(({todo}) => ({
    toDos : todo.toDos
  }))
  const dispatch = useDispatch();

  const onChange = e => {
    setText(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    setText("")
    // addToDo(text)
    dispatch(
      addToDo(text)
    )
  }

  return (
    <>
      <h2>To Do</h2>
      <form onSubmit={onSubmit}>
        <input value={text} onChange={onChange} type='text'/>
        <button>Add</button>
      </form>
      <ul>{toDos?.map(toDo => <ToDo {...toDo} key={toDo.id}/>)}</ul>
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     todos: state
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToDo : text => dispatch(actionCreators.addToDo(text))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps) (Home);

export default Home;