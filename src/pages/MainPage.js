import SignUp from '../components/SignUp';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const isModalOpend = useSelector((state) => state.signUp.isModalOpend);
  return <>{isModalOpend ? <SignUp /> : <h1>MainPage</h1>}</>;
};

export default MainPage;
