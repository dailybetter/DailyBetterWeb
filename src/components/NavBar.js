import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice';

const Navbar = () => {
  const isLoggediIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Home
        </Link>
        <ul className='navbar-nav' style={{ flexDirection: 'row' }}>
          {isLoggediIn ? <li className='nav-item'>
            <NavLink
              activeClassName='active'
              className='navbar-brand'
              aria-current='page'
              to='/admin/'
            >
              Admin
            </NavLink>
          </li> : null}
          <li className='nav-item me-2'>
            <NavLink
              activeClassName='active'
              className='navbar-brand'
              aria-current='page'
              to='/blogs/'
            >
              Posts
            </NavLink>
          </li>
          <li className='navbar-item me-2'>
            <button className='text-white btn btn-link text-decoration-none' onClick={() => {
              isLoggediIn ? dispatch(logout()) : dispatch(login());
            }}>{isLoggediIn ? 'Logout' : 'Login'}</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
