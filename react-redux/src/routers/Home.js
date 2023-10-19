import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const Home = ({todos, addToDo}) => {
  console.log(todos);
  const [text, setText] = useState("");
  
  const onChange = e => {
    setText(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    setText("")
    addToDo(text)
  }

  return (
    <>
      <h2>To Do</h2>
      <form onSubmit={onSubmit}>
        <input value={text} onChange={onChange} type='text'/>
        <button>Add</button>
      </form>
      <ul></ul>
    </>
  );
};

const mapStateToProps = state => {
  return {
    todos: state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addToDo : text => dispatch(actionCreators.addToDo(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);