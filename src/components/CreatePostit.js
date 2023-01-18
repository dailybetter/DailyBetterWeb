import { useRef, useEffect } from 'react';

const CreatePostit = () => {
  const titleRef = useRef();
  let title = '제목 없음';
  const randomColor = Math.floor(Math.random() * 6 + 1);
  const color_list = ['blue', 'green', 'orange', 'purple', 'yellow', 'brown'];
  const onSubmit = (e) => {
    e.preventDefault();
    title = titleRef.current.value;
    console.log(title);
    titleRef.current.value = '';
    console.log(color_list[randomColor]);
  };
  const Focus = () => {
    titleRef.current.focus();
  };
  useEffect(() => {
    Focus();
  }, []);
  return (
    <>
      <form>
        <div className='form-outline mb-4'>
          <textarea
            className='form-control'
            id='form4Example3'
            rows='4'
            ref={titleRef}
          ></textarea>
        </div>
        <div className='form-outline mb-4'>
          <textarea
            className='form-control'
            id='form4Example3'
            rows='4'
            ref={titleRef}
          ></textarea>
        </div>
        <button
          type='submit'
          className='btn btn-primary btn-block mb-4'
          onClick={onSubmit}
        >
          등록하기
        </button>
      </form>
    </>
  );
};

export default CreatePostit;
