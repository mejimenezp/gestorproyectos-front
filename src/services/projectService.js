import api from './apiService';

const projectService = {
  getProjects: async () => {
    try {
      const response = await api.get('/projects/');
      return response.data;
    } catch (error) {
      console.error('Error al cargar los proyectos', error);
      throw new Error('Error al cargar los proyectos.');
    }
  },

  getProject: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar el proyecto con ID ${id}`, error);
      throw new Error(`Error al cargar el proyecto con ID ${id}.`);
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el proyecto', error);
      throw new Error('Error al crear el proyecto.');
    }
  },

  updateProject: async (id, projectData) => {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el proyecto con ID ${id}`, error);
      throw new Error(`Error al actualizar el proyecto con ID ${id}.`);
    }
  },

  deleteProject: async (id) => {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el proyecto con ID ${id}`, error);
      throw new Error(`Error al eliminar el proyecto con ID ${id}.`);
    }
  },
};

export default projectService;
