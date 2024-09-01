
import api from './apiService';

const userStoryService = {
  getUserStories: async () => {
    try {
      const response = await api.get('/user-stories/');
      return response.data;
    } catch (error) {
      console.error('Error al cargar las historias de usuario', error);
      throw new Error('Error al cargar las historias de usuario.');
    }
  },

  getUserStory: async (id) => {
    try {
      const response = await api.get(`/user-stories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar la historia de usuario con ID ${id}`, error);
      throw new Error(`Error al cargar la historia de usuario con ID ${id}.`);
    }
  },

  getUserStoriesByProject: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/user-stories/`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar las historias de usuario para el proyecto con ID ${projectId}`, error);
      throw new Error(`Error al cargar las historias de usuario para el proyecto con ID ${projectId}.`);
    }
  },

  createUserStory: async (userStoryData) => {
    try {
      const response = await api.post('/user-stories/', userStoryData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la historia de usuario', error);
      throw new Error('Error al crear la historia de usuario.');
    }
  },

  updateUserStory: async (id, userStoryData) => {
    try {
      const response = await api.put(`/user-stories/${id}`, userStoryData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la historia de usuario con ID ${id}`, error);
      throw new Error(`Error al actualizar la historia de usuario con ID ${id}.`);
    }
  },

  deleteUserStory: async (id) => {
    try {
      const response = await api.delete(`/user-stories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar la historia de usuario con ID ${id}`, error);
      throw new Error(`Error al eliminar la historia de usuario con ID ${id}.`);
    }
  },
};

export default userStoryService;
