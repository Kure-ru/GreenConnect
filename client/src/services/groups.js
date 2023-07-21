import axios from "axios";
const baseUrl = "http://localhost:2121/groups";

let token = null;

const setToken = (newToken) => {
  console.log("token");
  token = `Bearer ${newToken}`;
};

const createGroup = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getGroups = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};



// eslint-disable-next-line import/no-anonymous-default-export
export default { createGroup, getGroups, setToken };
