import MainPage from './pages/MainPage';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ShowPage from './pages/ShowPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import MindPostPage from './pages/MindPostPage';
const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/blogs',
    component: ListPage,
  },
  {
    path: '/admin',
    component: AdminPage,
    auth: true,
  },
  {
    path: '/blogs/create',
    component: CreatePage,
  },
  {
    path: '/blogs/:id/edit',
    component: EditPage,
    auth: true,
  },
  {
    path: '/blogs/:id',
    component: ShowPage,
  },
  {
    path: '/postits/',
    component: MindPostPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
