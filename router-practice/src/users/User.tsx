import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { users } from '../db';

const User = () => {
  const { userId } = useParams()
  
  return (
    <div>
      <h1>
        User with id {userId} is name: {users[Number(userId) -1].name}
      </h1>
      <hr />
      <Link to={'followers'}>followers</Link>
      <Outlet 
        context={{
          nameOfMyUser: users[Number(userId) -1].name
        }}
      />
    </div>
  );
};

export default User;