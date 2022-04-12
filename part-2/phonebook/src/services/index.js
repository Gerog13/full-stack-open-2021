import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((response) => response.data);
};

const updatePhoneNumber = (personId, newPersonInfo) => {
  const request = axios.put(`${baseUrl}/${personId}`, newPersonInfo);
  return request.then((response) => response.data);
};

const exportedObject = {
  getAll,
  create,
  deletePerson,
  updatePhoneNumber,
};

export default exportedObject;
