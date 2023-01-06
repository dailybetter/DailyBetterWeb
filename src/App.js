import React, { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import Toast from './components/Toast';
import useToast from './hooks/toast';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import {login} from './store/authSlice'
import Spinner from './components/Spinner';

function App() {
  const toasts = useSelector((state) => state.toast.toasts);
  const { deleteToast } = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(localStorage.getItem('isLoggedIn')){
      dispatch(login());
    }
    setLoading(false);
  }, [])

  if (loading) {
    return <Spinner />
  }
  return (
    <Router>
      <Navbar />
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className='container mt-3'>
        <Switch>
          {routes.map((route) => {
            if (route.auth) {
              return <ProtectedRoute
                path={route.path}
                key={route.path}
                component={route.component}
                exact
              />
            }
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
