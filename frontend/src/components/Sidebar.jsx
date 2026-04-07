import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Live Feed', path: '/live' },
    { name: 'Mars', path: '/mars' },
    { name: 'Near Earth Objects', path: '/neo' },
    { name: 'Search', path: '/search' },
  ];

  return (
    <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 text-white h-screen p-6 fixed z-50">
      <h1 className="text-xl font-black mb-10 tracking-tighter text-blue-400">
        NASA <span className="text-white">INSIGHTS</span>
      </h1>
      
      <nav className="flex flex-col space-y-2">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg transition-all duration-300 text-sm uppercase tracking-widest ${
                isActive 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
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