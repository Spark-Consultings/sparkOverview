import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/ui/loader';

// Utilitaire pour ajouter un délai artificiel
const withDelay = (importFunction: () => Promise<any>, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(importFunction());
    }, delay);
  });
};

// Lazy load avec délai de 3 secondes
const Dashboard = lazy(() => withDelay(() => import('./components/Dashboard'), 3000));
const Home = lazy(() => withDelay(() => import('./components/Home'), 3000));
const About = lazy(() => withDelay(() => import('./components/About'), 3000));
const Login = lazy(() => withDelay(() => import('./components/Login'), 3000));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
