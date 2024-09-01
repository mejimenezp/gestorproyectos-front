import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage'; 
import Register from './pages/RegisterPage';
import CompanyPage from './pages/CompanyPage';
import GitHubLinksPage from './pages/Codepage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import UserStoryDetailsPage from './pages/UserStoryDetailsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppWrapper from './components/AppWrapper';

function App() {
  return (
    <Router>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<CompanyPage />} />
          <Route path="/Codigos" element={<GitHubLinksPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/user-stories/:id" element={<UserStoryDetailsPage />} />
          <Route path="/tickets/:id" element={<TicketDetailsPage />} />
        </Routes>
        <ToastContainer />
      </AppWrapper>
    </Router>
  );
}

export default App;
