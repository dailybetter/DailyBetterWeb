import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useHistory, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { bool } from 'prop-types';
import Pagination from './Pagination';

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const limit = 1;
  const onClickPageButton = (page) => {
    history.push(`/${location.pathname}?page=${page}`);
    getPosts(page);
  };

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts]);

  const getPosts = (page = 1) => {
    setCurrentPage(page);
    let params = {
      _page: page,
      _limit: limit,
      _sort: 'id',
      _order: 'desc',
    };
    if (!isAdmin) {
      params = { ...params, publish: true };
    }
    axios
      .get(`http://localhost:3003/posts`, {
        params,
      })
      .then((res) => {
        setNumberOfPosts(res.headers['x-total-count']);
        setPosts(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam));
  }, [pageParam]);

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3003/posts/${id}`).then((res) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
  };
  if (loading) {
    return <Spinner />;
  }
  if (posts.length === 0) {
    return <div>'No posts found'</div>;
  }
  const renderPageList = () => {
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
      {numberOfPages > 1 && (
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onClick={onClickPageButton}
        />
      )}
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
