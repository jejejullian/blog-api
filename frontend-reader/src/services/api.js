import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAllPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getCommentsByPost = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

export const createComment = async (postId, data) => {
  const response = await api.post(`/posts/${postId}/comments`, data);
  return response.data;
};

export default api;
