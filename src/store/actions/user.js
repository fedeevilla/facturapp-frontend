import { makeAction } from "async-action-creator";
import { createApiThunk } from "../../utils/thunk";
import api from "../../utils/api";
import * as R from "ramda";

export const LOGIN = makeAction("user/LOGIN");
export const LOGOUT = makeAction("user/LOGOUT");
export const SIGNUP = makeAction("user/SIGNUP");
export const FETCH_USER = makeAction("user/FETCH_USER");

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const login = createApiThunk({
  action: LOGIN,
  request: async formData => {
    const data = await api.user.login(formData);
    localStorage.setItem("token", data.token);

    return {
      ...data
    };
  },
  resolvedMessage: {
    message: "¡Bienvenido! 👋",
    description: "Es un gusto verte nuevamente por acá"
  },
  rejectedMessage: error => {
    const status = R.path(["response", "status"], error);

    return {
      message: "Error",
      description:
        status === 422
          ? "No se pudo iniciar sesión. Usuario o contraseña incorrectos"
          : "Error intentando iniciar sesión. Intente nuevamente más tarde"
    };
  }
});

export const signup = createApiThunk({
  action: SIGNUP,
  request: async formData => {
    const data = await api.user.signup(formData);

    setTimeout(() => {
      localStorage.setItem("token", data.token);
      window.location.reload();
    }, 2000);
  },
  resolvedMessage: {
    message: "¡Cuenta creada! 💪",
    description: "En breve serás redireccionado"
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo problemas con la creación del usuario."
  }
});

export const logout = createApiThunk({
  action: LOGOUT,
  request: async () => {
    await sleep(1000);
    localStorage.removeItem("token");
    window.location.replace("/");
  }
});

export const fetchProfile = createApiThunk({
  action: FETCH_USER,
  request: async () => await api.user.fetch(),
  rejectedMessage: {
    message: "Error",
    description: "No se pudo cargar el usuario"
  }
});
