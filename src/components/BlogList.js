import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useHistory } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { bool } from 'prop-types';
import Pagination from './Pagenation';

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPosts = (page = 1) => {
    axios
      .get(`http://localhost:3003/posts`, {
        params: {
          _page: page,
          _limit: 5,
          _sort: 'id',
          _order: 'desc',
        },
      })
      .then((res) => {
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
  if (loading) {
    return <Spinner />;
  }
  if (posts.length === 0) {
    return <div>'No posts found'</div>;
  }
  const renderPageList = () => {
    return posts
      .filter((post) => isAdmin || post.publish)
      .map((post) => {
        return (
          <Card
            key={post.id}
            title={post.title}
            onClick={(e) => {
              e.stopPropagation(); //이벤트 버블링 방지
              history.push(`/blogs/${post.id}`);
            }}
          >
            {isAdmin ? (
              <div>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={(e) => deleteBlog(e, post.id)}
                >
                  Delete
                </button>
              </div>
            ) : null}
          </Card>
        );
      });
  };
  return (
    <>
      {renderPageList()}
      <Pagination />
    </>
  );
};
BlogList.propTypes = {
  isAdmin: bool,
};
BlogList.defaultProps = {
  isAdmin: false,
};
export default BlogList;
