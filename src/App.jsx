import React, { useEffect } from 'react';
import { CateringProvider, useCatering } from './context/CateringContext';
import { UserView } from './pages/UserView';
import { AdminPortal } from './pages/AdminPortal';

function MainRouter() {
  const { isAdminMode, setIsAdminMode, setAdminAuth } = useCatering();

  // Check URL hash for direct admin routing (e.g. #admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        setIsAdminMode(true);
      } else if (!window.location.hash || window.location.hash === '#/') {
        setIsAdminMode(false);
        setAdminAuth(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setIsAdminMode, setAdminAuth]);

  return isAdminMode ? <AdminPortal /> : <UserView />;
}

export default function App() {
  return (
    <CateringProvider>
      <MainRouter />
    </CateringProvider>
  );
}
