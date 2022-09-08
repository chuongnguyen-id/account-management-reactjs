import Api from "./Api";

const url = "/users";

const getAll = () => {
  return Api.get(url);
};

const getByID = (id) => {
  return Api.get(`${url}/${id}`);
};

const create = (body) => {
  return Api.post(url, body);
};

const updateByID = (id, body) => {
  return Api.put(`${url}/${id}`, body);
};

const deleteByIds = (ids) => {
  return Api.delete(`${url}?ids=${ids.toString()}`);
};

// export
const api = { getAll, getByID, create, updateByID, deleteByIds };
export default api;
