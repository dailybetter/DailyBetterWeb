import { useRef } from 'react';

const CreatePostit = () => {
  const textRef = useRef();
  let title = '제목 없음';
  const randomColor = Math.floor(Math.random() * 6 + 1);
  const color_list = ['blue', 'green', 'orange', 'purple', 'yellow', 'brown'];
  const onSubmit = (e) => {
    e.preventDefault();
    title = textRef.value;
    console.log(title);
    textRef.value = '';
    console.log(color_list[randomColor]);
  };
  return (
    <>
      <form>
        <div className='form-outline mb-4'>
          <textarea
            className='form-control'
            id='form4Example3'
            rows='4'
            ref={textRef}
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
