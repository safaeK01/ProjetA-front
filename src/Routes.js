// Routes.js
import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import Login from './Authentification/Login'; // Import your Login component
import Admin from './components/Admin';
import Etudiant from './components/Etudiant';
import Enseignant from './components/Enseignant';
import App from './App';
import Inscription from './Authentification/Inscription';


const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<Inscription />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-page" element={<Admin />} />
      <Route path="/etudiant-page" element={<Etudiant />} />
      <Route path="/enseignant-page" element={<Enseignant />} />
      {/* <Route path="/home" element={<Home />} />
      Add more routes as needed */}
    </ReactRoutes>
  );
};

export default Routes;
