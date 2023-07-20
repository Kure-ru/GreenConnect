import axios from "axios";
const baseUrl = "http://localhost:2121/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};


const login = async credentials => {
    const response = await axios.post(`${baseUrl}/login`, credentials)
    console.log(`response data login ${response.data}`)
    return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};



// eslint-disable-next-line import/no-anonymous-default-export
export default { login, getUser, create, update, setToken };
