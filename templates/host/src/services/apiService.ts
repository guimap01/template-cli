import axios from 'axios';

const apiService = () => {
  return axios.create({
    baseURL: process.env.BASE_URL,
  });
};

export const api = apiService();
