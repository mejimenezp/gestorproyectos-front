import apiService from './apiService';

const companyService = {
  getCompanies: () => apiService.get('/companies/'),
};

export default companyService;
