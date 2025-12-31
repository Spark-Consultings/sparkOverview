import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainFeed from './components/MainFeed';
import ComingSoon from './components/ComingSoon';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ComingSoon />} />
    </Routes>
  );
};

export default AppRoutes;
