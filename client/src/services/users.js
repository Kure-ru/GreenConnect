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


const addSavedPost =  async (userId, postId) => {
  console.log("added")
  const response = await axios.post(`${baseUrl}/${userId}/${postId}`);
  return response.data;
};

const removeSavedPost =  async (userId, postId) => {
  console.log("removed")
  const response = await axios.delete(`${baseUrl}/${userId}/${postId}`);
  return response.data;
};

const addSavedGroup =  async (userId, groupId) => {
  console.log("added")
  const response = await axios.post(`${baseUrl}/${userId}/group/${groupId}`);
  return response.data;
};


const removeSavedGroup =  async (userId, groupId) => {
  console.log("removed")
  const response = await axios.delete(`${baseUrl}/${userId}/group/${groupId}`);
  return response.data;
};


// eslint-disable-next-line import/no-anonymous-default-export
export default { login, getUser, create, update, setToken, addSavedPost, removeSavedPost, addSavedGroup, removeSavedGroup };
