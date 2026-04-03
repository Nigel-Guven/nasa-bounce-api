import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Mars', path: '/mars' },
    { name: 'NEO', path: '/neo' },
    { name: 'Search', path: '/search' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 fixed">
      <h1 className="text-2xl font-bold mb-8">NASA Bounce</h1>
      <nav className="flex flex-col space-y-4">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `py-2 px-4 rounded hover:bg-gray-700 transition-colors ${
                isActive ? 'bg-gray-700 font-semibold' : ''
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;