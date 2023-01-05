import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
const BlogForm = ({ editing, addToast }) => {
  const { id } = useParams();
  const [prevTitle, setPrevTitle] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [prevContent, setPrevContent] = useState('');
  const [publish, setPublish] = useState(false);
  const [prevPublish, setPrevPublish] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3003/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setPrevTitle(res.data.title);
        setContent(res.data.content);
        setPrevContent(res.data.content);
        setPublish(res.data.publish);
        setPrevPublish(res.data.publish);
      });
    }
  }, [id, editing]);
  const Cancel = () => {
    editing ? history.push(`/blogs/${id}`) : history.push('/blogs');
  };
  const onChangePublish = (e) => {
    setPublish(e.target.checked);
  };
  const isEdited = () => {
    return (
      title !== prevTitle || content !== prevContent || prevPublish !== publish
    );
  };
  const validateForm = () => {
    let validate = true;
    if (title === '') {
      setTitleError(true);
      validate = false;
    }
    if (content === '') {
      setContentError(true);
      validate = false;
    }
    return validate;
  };

  const onSubmit = () => {
    setTitleError(false);
    setContentError(false);
    if (validateForm()) {
      if (title === '' || content === '') {
        window.alert('제목과 내용을 입력하세요');
      } else {
        if (editing) {
          axios
            .put(`http://localhost:3003/posts/${id}`, {
              title,
              content,
              publish,
            })
            .then((res) => {
              history.push(`/blogs/${id}`);
            });
        } else {
          axios
            .post('http://localhost:3003/posts', {
              title,
              content,
              createdAt: Date.now(),
              publish,
            })
            .then(() => {
              addToast({
                type: 'success',
                text: '포스트작성 성공!',
              });
              history.push('/admin');
            });
        }
      }
    }
  };
  return (
    <>
      <h1>{editing ? 'Edit' : 'Create'}</h1>
      <div className='mb-1'>
        <label className='form-label'>Title</label>
        <input
          className={`form-control ${titleError ? 'border-danger' : ''}`}
          placeholder='Title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        {titleError && <div className='text-danger'>타이틀을 입력하세요.</div>}
      </div>
      <div className='mb-3'>
        <label className='form-label'>Content</label>
        <textarea
          className={`form-control ${contentError ? 'border-danger' : ''}`}
          placeholder='Content'
          value={content}
          rows='10'
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        {contentError && <div className='text-danger'>내용을 입력하세요.</div>}
      </div>
      <div className='form-check mb-3'>
        <input
          className='form-check-input'
          type='checkbox'
          checked={publish}
          onChange={onChangePublish}
        />
        <label className='form-check-label'>Publish</label>
      </div>
      <button
        className='btn btn-primary'
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? 'Edit' : 'Create'}
      </button>
      <button className='btn btn-danger ms-2' onClick={Cancel}>
        Cancel
      </button>
    </>
  );
};

BlogForm.propTypes = {
  editing: propTypes.bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
