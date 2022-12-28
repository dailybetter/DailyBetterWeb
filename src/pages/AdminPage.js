import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';

const AdminPage = () => {
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1>AdminPage</h1>
        <div>
          <Link to='/blogs/create' className='btn btn-dark'>
            Create New
          </Link>
        </div>
      </div>
      <BlogList isAdmin={true} />
    </>
  );
};

export default AdminPage;
