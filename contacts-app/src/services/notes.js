import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data);
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  console.log('create req', request)
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data);
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  //console.log('remove req', request)
  return request.then(response => response.data);
}

// eslint-disable-next-line
export default { getAll, create, update, remove };