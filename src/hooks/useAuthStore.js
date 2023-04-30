import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../axiosApi";
import { checking, onLogin, onLogout, onRegistration } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(checking());
      const body = { email, password };
      const { data } = await calendarApi.post("/auth/login", { ...body });

      if (data?.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        const user = data?.user;
        dispatch(onLogin({ ...user }));
      }
    } catch (error) {
      console.log(error?.response?.data);
      dispatch(onLogout(error?.response?.data?.message));
    }
  };

  const startNewAccount = async ({ username, email, password }) => {
    try {
      dispatch(checking());
      const body = { username, email, password };
      const { data } = await calendarApi.post("/auth/new-user", { ...body });

      if (data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(onRegistration(data));
      }
    } catch (error) {
      console.log({ error });
      dispatch(onLogout(error?.response?.data?.message));
    }
  };

  return {
    errorMessage,
    status,
    user,

    startLogin,
    startNewAccount,
  };
};
