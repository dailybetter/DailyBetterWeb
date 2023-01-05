import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { useHistory, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Pagination from './Pagination';
import propTypes from 'prop-types';
import Toast from './Toast';
import useToast from '../hooks/toast';

const BlogList = ({ isAdmin }) => {
  const [toasts, addToast, deleteToast] = useToast();
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const limit = 5;

  const onClickPageButton = (page) => {
    history.push(`${location.pathname}?page=${page}`);
    setCurrentPage(page);
    getPosts(page);
  };

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts]);

  const getPosts = useCallback(
    (page = 1) => {
      setCurrentPage(page);
      let params = {
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
        title_like: searchText,
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
    },
    [isAdmin, searchText]
  );

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3003/posts/${id}`).then((res) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    });
    addToast({
      text: '포스트가 삭제되었습니다.',
      type: 'success',
    });
  };

  if (loading) {
    return <Spinner />;
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
  const onSearch = (e) => {
    if (e.key === 'Enter') {
      history.push(`${location.pathname}?page=1`);
      setCurrentPage(1);
      getPosts(1);
    }
  };
  const onSearchBtn = () => {
    history.push(`${location.pathname}?page=1`);
    setCurrentPage(1);
    getPosts(1);
  };
  return (
    <>
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className='input-group'>
        <input
          className='form-control'
          type='text'
          placeholder='Search..'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={onSearch}
        ></input>
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary' onClick={onSearchBtn}>
            Search
          </button>
        </div>
      </div>
      <hr />
      {posts.length === 0 ? (
        <div>'No posts found'</div>
      ) : (
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
      )}
    </>
  );
};
BlogList.propTypes = {
  isAdmin: propTypes.bool,
};
BlogList.defaultProps = {
  isAdmin: false,
};
export default BlogList;
