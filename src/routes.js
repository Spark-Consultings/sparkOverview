import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/ui/loader';

// Utilitaire pour ajouter un délai artificiel
const withDelay = (importFunction, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(importFunction());
    }, delay);
  });
};

// Lazy load avec délai de 2 secondes
const MainFeed = lazy(() => withDelay(() => import('./components/MainFeed'), 2000));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainFeed />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
