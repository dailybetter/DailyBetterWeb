import BlogForm from '../components/BlogForm';
import ImageInput from '../components/ImageInput';
const CreatePage = ({ addToast }) => {
  return (
    <>
      <BlogForm addToast={addToast} />
      <ImageInput />
    </>
  );
};

export default CreatePage;
