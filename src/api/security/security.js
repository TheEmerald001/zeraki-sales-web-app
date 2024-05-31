import { moduleAxios } from "../axios";

// basic api security
export const createAccount = async (user_name, email, password) => {
  return await moduleAxios.post(`/users`, {
    user_name,
    email,
    password,
  });
};

// basic api security - modified to match mock spec
export const userLogIn = async (user_name, password) => {
  return await moduleAxios.get(`/users`);
};

// change user credentials
export const updateAccount = async (user_name, email, password, user_id) => {
  return await moduleAxios.patch(`/users/${user_id}`, {
    user_name,
    email,
    password,
  });
};
