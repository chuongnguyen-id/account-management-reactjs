import Api from "./Api";

const url = "/login";

const login = (username, password) => {
  const parameters = {
    username: username,
    password: password,
  };
  return Api.get(url, { params: parameters });
};

export const api = { login };
export default api;
