import React, { FormEvent, useState } from 'react';

const App = () => {
  const [value, setValue] = useState("");

  const onChange = (e : FormEvent<HTMLInputElement>) => {
    const {
      currentTarget : {value}
    } = e
    setValue(value);
  }

  const onSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello' + value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          value={value}
          onChange={onChange}
          placeholder='username'
          type='text'
        />
        <button>log in</button>
      </form>
    </div>
  );
};

export default App;