import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../axiosApi';
import { checking, onLogin, onLogout, onRegistration } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(checking());
      const body = { email, password };
      const { data } = await calendarApi.post('/auth/login', { ...body });

      if (data?.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        const user = data?.user;
        dispatch(onLogin({ ...user }));
      }
    } catch (error) {
      dispatch(onLogout(error?.response?.data?.message));
    }
  };

  const startNewAccount = async ({ username, email, password }) => {
    try {
      dispatch(checking());
      const body = { username, email, password };
      const { data } = await calendarApi.post('/auth/new-user', { ...body });

      if (data.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onRegistration(data));
      }
    } catch (error) {
      dispatch(onLogout(error?.response?.data?.message));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {

      const { data } = await calendarApi.get('/auth/renew');
      const user = { name: data.username, userId: data.userId, email: data.userEmail };

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({...user}));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    errorMessage,
    status,
    user,

    checkAuthToken,
    startLogin,
    startNewAccount,
    startLogout,
  };
};
