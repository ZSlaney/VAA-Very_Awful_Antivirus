import * as React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';




export default function App() {
  const [page, setPage] = React.useState<'login' | 'dashboard' | 'about'>('login');
  return (
    <>
    {page === 'login' && <Login setPage={setPage} />}
    {page === 'dashboard' && <Dashboard setPage={setPage} />}
    {page === 'about' && <AboutUs />}
    </>
          
  );
}