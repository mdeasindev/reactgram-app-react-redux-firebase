import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactGram from './ReactGram';
import Login from './auth/Login';
import Register from './auth/Register';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={ReactGram} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
