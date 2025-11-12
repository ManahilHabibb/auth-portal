import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export const signUp = async (userData) => {
  const res = await axios.post(`${API}/auth/signup`, userData);
  return res.data;
};

export const signIn = async (userData) => {
  const res = await axios.post(`${API}/auth/signin`, userData);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await axios.get(`${API}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const sendMessage = async (message, token) => {
  const res = await axios.post(
    `${API}/messages`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
