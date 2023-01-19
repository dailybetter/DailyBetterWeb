import axios from 'axios';
import { useRef, useEffect } from 'react';
import useToast from '../hooks/toast';
import { useDispatch } from 'react-redux';
import { postitUpdate } from '../store/postitSlice';
const CreatePostit = () => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const titleRef = useRef();
  let content = '내용 없음';
  const color_list = ['blue', 'green', 'orange', 'purple', 'yellow', 'brown'];
  const randomColor = color_list[Math.floor(Math.random() * 5 + 1)];
  const onSubmit = (e) => {
    e.preventDefault();
    content = titleRef.current.value;
    console.log(content);
    titleRef.current.value = '';
    console.log(randomColor);
    axios
      .post('http://localhost:3003/postits/', {
        content,
        color: randomColor,
      })
      .then(() => {
        addToast({
          type: 'success',
          text: '포스트작성 성공!',
        });
        dispatch(postitUpdate());
      });
  };
  const Focus = () => {
    titleRef.current.focus();
  };
  useEffect(() => {
    Focus();
  }, []);
  return (
    <>
      <div className='col-md-4 col-sm-6 content-card'>
        <div className='card-big-shadow'>
          <div
            className='card card-just-text'
            data-background='color'
            data-color={randomColor}
            data-radius='none'
          >
            <form>
              <div className='form-outline mb-4'>
                <textarea
                  className='form-control border-0 bg-transparent'
                  id='form4Example3'
                  type='text'
                  rows='4'
                  ref={titleRef}
                  border='none'
                  resize='none'
                  placeholder='작성하세요'
                ></textarea>
              </div>
              <div className='d-flex flex-row-reverse'>
                <button
                  type='submit'
                  className='btn btn-outline-dark'
                  onClick={onSubmit}
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostit;
