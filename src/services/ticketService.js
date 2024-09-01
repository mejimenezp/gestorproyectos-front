import apiService from './apiService';

const ticketService = {
  getTickets: async () => {
    try {
      const response = await apiService.get('/tickets/');
      return response.data;
    } catch (error) {
      console.error('Error al cargar los tickets', error);
      throw new Error('Error al cargar los tickets.');
    }
  },

  getTicket: async (id) => {
    try {
      const response = await apiService.get(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar el ticket con ID ${id}`, error);
      throw new Error(`Error al cargar el ticket con ID ${id}.`);
    }
  },

  getTicketsByUserStory: async (userStoryId) => {
    try {
      const response = await apiService.get(`/user-stories/${userStoryId}/tickets/`);
      return response.data;
    } catch (error) {
      console.error(`Error al cargar los tickets para la historia de usuario con ID ${userStoryId}`, error);
      throw new Error(`Error al cargar los tickets para la historia de usuario con ID ${userStoryId}.`);
    }
  },

  createTicket: async (ticketData) => {
    try {
      const response = await apiService.post('/tickets/', ticketData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el ticket', error);
      throw new Error('Error al crear el ticket.');
    }
  },

  updateTicket: async (id, ticketData) => {
    try {
      const response = await apiService.put(`/tickets/${id}/`, ticketData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el ticket con ID ${id}`, error);
      throw new Error(`Error al actualizar el ticket con ID ${id}.`);
    }
  },

  deleteTicket: async (id) => {
    try {
      const response = await apiService.delete(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el ticket con ID ${id}`, error);
      throw new Error(`Error al eliminar el ticket con ID ${id}.`);
    }
  },
};

export default ticketService;
