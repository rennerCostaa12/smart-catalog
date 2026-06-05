import type { AuthLoginData, AuthRegisterData } from "./types";

export const initialAuthValues: AuthLoginData = {
  email: "",
};

export const initialRegisterUserValues: AuthRegisterData = {
  name: "",
  email: "",
  phone: "",
};
