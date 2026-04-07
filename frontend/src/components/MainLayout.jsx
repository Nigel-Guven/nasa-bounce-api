import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="bg-galaxy flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto ml-64">
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;