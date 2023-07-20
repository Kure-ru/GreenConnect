import axios from "axios";
const baseUrl = "http://localhost:2121/posts";

let token = null;

const setToken = (newToken) => {
  console.log("token");
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};


const post = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const deletePost = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('service')
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { post, setToken, getAll, deletePost };
