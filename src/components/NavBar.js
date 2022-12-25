import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Home
        </Link>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink
              activeClassName='active'
              className='navbar-brand'
              aria-current='page'
              to='/blogs/'
            >
              Posts
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;