import { makeAction } from "async-action-creator";
import { createApiThunk } from "../../utils/thunk";
import api from "../../utils/api";
import * as R from "ramda";

export const LOGIN = makeAction("user/LOGIN");
export const LOGOUT = makeAction("user/LOGOUT");
export const SIGNUP = makeAction("user/SIGNUP");
export const FETCH_USER = makeAction("user/FETCH_USER");
export const UPDATE_USER = makeAction("user/UPDATE_USER");
export const CHANGE_PASSWORD = makeAction("user/CHANGE_PASSWORD");
export const ACTIVATE_USER = makeAction("user/ACTIVATE_USER");
export const RECOVERY_PASSWORD = makeAction("user/RECOVERY_PASSWORD");

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const login = createApiThunk({
  action: LOGIN,
  request: async (formData) => {
    const data = await api.user.login(formData);
    localStorage.setItem("token", data.token);

    return {
      token: data.token,
      ...data.user,
    };
  },
  resolvedMessage: {
    message: "¡Bienvenido! 👋",
    description: "Es un gusto verte nuevamente por acá",
  },
  rejectedMessage: (error) => {
    const status = R.path(["response", "status"], error);

    return {
      message: "Error",
      description:
        status === 422
          ? "No se pudo iniciar sesión. Usuario o contraseña incorrectos"
          : "Error intentando iniciar sesión. Intente nuevamente más tarde",
    };
  },
});

export const signup = createApiThunk({
  action: SIGNUP,
  request: async (formData) => await api.user.signup(formData),
  resolvedMessage: {
    message: "¡Cuenta creada! 💪",
    // description: "Te enviamos un email para activar tu cuenta",
    description: "Ahora debes ingresar tus credenciales",
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo problemas con la creación del usuario.",
  },
});

export const logout = createApiThunk({
  action: LOGOUT,
  request: async () => {
    await sleep(1000);
    localStorage.removeItem("token");
    window.location.replace("/");
  },
});

export const fetchProfile = createApiThunk({
  action: FETCH_USER,
  request: async () => await api.user.fetch(),
  rejectedMessage: () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.replace("/");
    }, 2000);

    return {
      message: "Error",
      description: "No se pudo cargar el usuario",
    };
  },
});

export const updateUser = createApiThunk({
  action: UPDATE_USER,
  request: async (formData) => await api.user.update(formData),
  resolvedMessage: {
    message: "Éxito",
    description: "El usuario se guardó correctamente",
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo problemas con la modificación del usuario.",
  },
});

export const updateUsdBalance = createApiThunk({
  action: UPDATE_USER,
  request: async (formData) => await api.user.balance(formData),
  resolvedMessage: {
    message: "Éxito",
    description: "El balance se actualizó correctamente",
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo problemas con la modificación del balance.",
  },
});

export const changePassword = createApiThunk({
  action: CHANGE_PASSWORD,
  request: async (formData) => {
    await api.user.changePassword(formData);
  },
  resolvedMessage: {
    message: "Éxito",
    description: "La contraseña se modificó correctamente",
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo problemas con la modificación de la contraseña.",
  },
});

export const activateUser = createApiThunk({
  action: ACTIVATE_USER,
  request: async (token) => {
    const data = await api.user.activate(token);
    localStorage.setItem("token", token);
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);

    return data;
  },
  resolvedMessage: {
    message: "Éxito",
    description: "Tu cuenta se activó correctamente",
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo problemas con la activación de la cuenta.",
  },
});

export const recoveryPassword = createApiThunk({
  action: RECOVERY_PASSWORD,
  request: async ({ token, formData }) => {
    await api.user.recoveryPassword(token, formData);
  },
  resolvedMessage: () => {
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
    return {
      message: "Éxito",
      description: "La contraseña se modificó correctamente",
    };
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo problemas con la modificación de la contraseña.",
  },
});

export const sendEmailPassword = createApiThunk({
  action: RECOVERY_PASSWORD,
  request: async (formData) => {
    await api.user.sendEmailPassword(formData);
  },
  resolvedMessage: {
    message: "Éxito",
    description: "Se ha enviado un email para restaurar la contraseña",
  },
  rejectedMessage: {
    message: "Error",
    description: "Hubo problemas con el envío del email.",
  },
});
