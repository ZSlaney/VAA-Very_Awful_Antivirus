import * as React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import Analytics from './pages/Analytics';
import ScanTool from './pages/ScanTool';


export type PageType = 'login' | 'dashboard' | 'about' | 'analytics' | 'scantool';

export const DEBUG = true;

export default function App() {
  const [page, setPage] = React.useState<PageType>('login');
  return (
    <>
    {page === 'login' && <Login setPage={setPage} />}
    {page === 'dashboard' && <Dashboard setPage={setPage} />}
    {page === 'about' && <AboutUs setPage={setPage} />}
    {page === 'analytics' && <Analytics setPage={setPage} />}
    {page === 'scantool' && <ScanTool setPage={setPage} />}
    </>

  );
}