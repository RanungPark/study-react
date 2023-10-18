import React, { useState } from 'react';

const Home = () => {
  const [text, setText] = useState("");
  
  const onChange = e => {
    setText(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    setText("")
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

export default Home;