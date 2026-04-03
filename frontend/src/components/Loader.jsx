import React from 'react';

const Loading = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
    <div className="relative flex items-center justify-center">
      <div className="w-24 h-24 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      
      <div className="absolute w-16 h-16 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin-slow"></div>
      
      <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse"></div>
    </div>

    <div className="mt-8 text-center">
      <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
        Loading...
      </p>
    </div>
  </div>
);

export default Loading;