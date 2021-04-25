import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://registry.npmjs.org/',
});

export function searchPackages(searchQuery) {
  return api.get(`/-/v1/search?size=250&text=${searchQuery}`);
}

export function fetchPackage(name) {
  return axios.get(`https://data.jsdelivr.com/v1/package/npm/${name}`);
}
