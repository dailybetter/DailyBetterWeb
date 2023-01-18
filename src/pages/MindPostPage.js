import Postit from '../components/Postit';
import CreatePostit from '../components/CreatePostit';
const MindPostPage = () => {
  return (
    <>
      <h1>마인드 포스트잇</h1>
      <CreatePostit />
      <Postit />
    </>
  );
};

export default MindPostPage;
