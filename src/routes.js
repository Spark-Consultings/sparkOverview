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
const MainFeed = lazy(() => withDelay(() => import('./components/MainFeed'), 3000));
const About = lazy(() => withDelay(() => import('./components/About'), 3000));
const Login = lazy(() => withDelay(() => import('./components/Login'), 3000));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainFeed />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
