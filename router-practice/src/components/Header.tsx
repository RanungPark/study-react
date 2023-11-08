import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Header = () => {
  const navigete = useNavigate()
  const onAboutClick = () => {
    navigete('/about');
  }

  return (
    <ul>
      <li><Link to={'/'}>Home</Link></li>
      <li><button onClick={onAboutClick}>About</button></li>
    </ul>
  );
};

export default Header;