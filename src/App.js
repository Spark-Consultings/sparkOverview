import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppRoutes from './routes'; // Import the routes
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div>
      <ErrorBoundary>
        <SpeedInsights/>
        <Analytics />
        <AppRoutes /> {/* Use the centralized routes */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
