import React, { useState, useRef } from 'react';

function ImageInput() {
  const ImageInputRef = useRef();
  const onClick = () => {
    ImageInputRef.current.click();
  };
  // const handleImg = (e) => {
  //   const formData = new FormData();
  //   formData.append('image', e.target.files[0]);
  //   axios.post('http://localhost:3003/posts', {
  //     url: e.tartget.files[0],
  //   });
  // };
  const [imgFile, setImgFile] = useState('');
  const handleImg = (e) => {
    const Img = ImageInputRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(Img);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  return (
    <>
      <button className='btn btn-success ms-2' onClick={onClick}>
        {' '}
        Image
      </button>
      <input
        type='file'
        ref={ImageInputRef}
        accept='image/*'
        onChange={(e) => handleImg(e)}
        style={{ display: 'none' }}
      ></input>
      <img src={imgFile ? imgFile : ''} alt='' />
    </>
  );
}

export default ImageInput;
