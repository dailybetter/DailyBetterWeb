import axios from 'axios';
import { bool } from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const BlogForm = ({ editing }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();
  useEffect(() => {
    axios.get(`http://localhost:3003/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);
  const onSubmit = () => {
    if (title === '' || content === '') {
      window.alert('제목과 내용을 입력하세요');
    } else {
      if (editing) {
        axios
          .put(`http://localhost:3003/posts/${id}`, {
            title,
            content,
          })
          .then(history.push('/blogs'));
      } else {
        axios
          .post('http://localhost:3003/posts', {
            title,
            content,
            createdAt: Date.now(),
          })
          .then(() => {
            history.push('/blogs');
          });
      }
    }
  };
  return (
    <>
      <h1>{editing ? 'Edit' : 'Create'}</h1>
      <div className='mb-1'>
        <label className='form-label'>Title</label>
        <input
          className='form-control'
          placeholder='Title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Content</label>
        <textarea
          className='form-control'
          placeholder='Content'
          value={content}
          rows='10'
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      <button className='btn btn-primary' onClick={onSubmit}>
        {editing ? 'Edit' : 'Create'}
      </button>
    </>
  );
};

BlogForm.propTypes = {
  editing: bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
