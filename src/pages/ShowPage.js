import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useToast from '../hooks/toast';
import NotFoundPage from './NotFoundPage';
const ShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const {addToast} = useToast();
  const [error, setError] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const getPost = (id) => {
    axios.get(`http://localhost:3003/posts/${id}`).then((res) => {
      setPost(res.data);
      setLoading(false);
    }).catch(e => {
      setLoading(false)
      setError(true)
      addToast({
        text: 'DB연결 상태를 확인하세요.',
        type: 'danger',
      });
    })
  };
  useEffect(() => {
    getPost(id);
  }, [id]);
  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <Spinner />;
  }
  if(error) {
    return <><NotFoundPage></NotFoundPage></>
  }
  return (
    <>
      <div className='d-flex'>
        <h1 className='flex-grow-1'>{post.title}</h1>
        {isLoggedIn && <div>
          <Link to={`/blogs/${id}/edit`} className='btn btn-primary'>
            Edit
          </Link>
        </div>}
      </div>
      <small className='text-muted'>
        Created At: {printDate(post.createdAt)}
      </small>
      <hr />
      <div>{post.content}</div>
    </>
  );
};

export default ShowPage;
