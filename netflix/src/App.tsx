import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Home from './Routers/Home';
import Tv from './Routers/Tv';
import Search from './Routers/Search';
import Header from './Components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/tv'>
          <Tv />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;