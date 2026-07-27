import type { AuthLoginData, AuthRegisterData } from "./types";

export const AUTH_SESSION_FLAG_STORAGE_KEY = "@smart-catalog:auth-session";

export const initialAuthValues: AuthLoginData = {
  email: "",
};

export const initialRegisterUserValues: AuthRegisterData = {
  name: "",
  email: "",
  phone: "",
};
