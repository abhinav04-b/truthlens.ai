import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import AnalyzePage from './components/AnalyzePage';
import AboutPage from './components/AboutPage';
import LegalPage from './components/LegalPage';
import FundPage from './components/FundPage';
import { ViewType } from './types';

// Helper to determine ViewType from the current URL path
const getViewFromPath = (): ViewType => {
  const path = window.location.pathname.toLowerCase();
  
  if (path === '/ai' || path === '/analyze') return 'analyze';
  if (path === '/fund' || path === '/support') return 'fund';
  if (path === '/mission' || path === '/about') return 'about';
  if (path === '/terms' || path === '/legal') return 'legal';
  
  return 'home';
};

const App: React.FC = () => {
  // Initialize state based on the current URL
  const [view, setViewState] = useState<ViewType>(getViewFromPath);

  // Wrapper for setting view that also updates the URL
  const setView = (newView: ViewType) => {
    setViewState(newView);
    
    let path = '/';
    switch (newView) {
      case 'analyze':
        path = '/ai';
        break;
      case 'fund':
        path = '/fund';
        break;
      case 'about':
        path = '/mission';
        break;
      case 'legal':
        path = '/terms';
        break;
      case 'home':
      default:
        path = '/';
        break;
    }

    // Only push state if we aren't already on that path
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  // Listen for browser Back/Forward button clicks
  useEffect(() => {
    const handlePopState = () => {
      setViewState(getViewFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Layout currentView={view} setView={setView}>
      {view === 'home' && <HomePage setView={setView} />}
      {view === 'analyze' && <AnalyzePage />}
      {view === 'about' && <AboutPage />}
      {view === 'legal' && <LegalPage />}
      {view === 'fund' && <FundPage />}
    </Layout>
  );
};

export default App;