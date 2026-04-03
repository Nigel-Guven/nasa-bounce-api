import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    // 'flex' makes Sidebar and Main sit side-by-side
    // 'min-h-screen' ensures the background doesn't cut off
    <div className="flex min-h-screen">
      {/* Sidebar - fixed width */}
      <Sidebar />

      {/* Main content - fills remaining space and applies the galaxy background */}
      <main className="flex-1 bg-galaxy overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;