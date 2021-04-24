import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'https://registry.npmjs.org/',
    // baseURL: 'https://data.jsdelivr.com/-/v1/',
  });
};
