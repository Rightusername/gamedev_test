import axios from 'axios';

export const jsdelivrAPI = 'https://data.jsdelivr.com/v1/';

export const npmAPI = axios.create({
  baseURL: 'https://registry.npmjs.org/',
});

export function searchPackages(searchQuery) {
  return npmAPI.get(`/-/v1/search?size=250&text=${searchQuery}`);
}

export function fetchPackage(name) {
  return axios.get(jsdelivrAPI + `package/npm/${name}`);
}
