import React, { useEffect } from 'react';
import { CateringProvider, useCatering } from './context/CateringContext';
import { UserView } from './pages/UserView';
import { AdminPortal } from './pages/AdminPortal';

function MainRouter() {
  const { isAdminMode, setIsAdminMode } = useCatering();

  // Check URL hash for direct admin routing (e.g. #admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setIsAdminMode(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setIsAdminMode]);

  return isAdminMode ? <AdminPortal /> : <UserView />;
}

export default function App() {
  return (
    <CateringProvider>
      <MainRouter />
    </CateringProvider>
  );
}
