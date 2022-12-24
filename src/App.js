import React from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container mt-3'>
        <Switch>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact
                component={route.component}
              />
            );
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
