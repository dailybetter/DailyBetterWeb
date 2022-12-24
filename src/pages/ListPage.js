import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../components/Spinner';
const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPosts = () => {
    axios.get('http://localhost:3003/posts/').then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  };

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3003/posts/${id}`).then((res) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const renderBlogList = () => {
    if (loading) {
      return <Spinner />;
    }
    if (posts.length === 0) {
      return <div>'No posts found'</div>;
    }
    return posts.map((post) => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={(e) => {
            e.stopPropagation(); //이벤트 버블링 방지
            history.push(`/blogs/${post.id}`);
          }}
        >
          <div>
            <button
              className='btn btn-danger btn-sm'
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>
        </Card>
      );
    });
  };
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1>ListPage</h1>
        <Link to='/blogs/create' className='btn btn-dark'>
          Create New
        </Link>
      </div>
      {renderBlogList()}
    </>
  );
};

export default ListPage;
