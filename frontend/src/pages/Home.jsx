import React from 'react';
import { useAPOD } from '../hooks/useApod'; 
import Loading from '../components/Loader.jsx';

const Home = () => {
  const { data: apod, loading, error, refetch } = useAPOD();

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-galaxy p-6">
      <div className="relative group max-w-md w-full">

        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-black/80 backdrop-blur-xl border border-red-500/50 p-8 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.2)] text-center">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">
            Signal Interrupted
          </h3>
          
          <p className="text-red-300/80 mb-8 font-mono text-sm leading-relaxed">
            {error}
          </p>

          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-red-100 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95"
          >
            RE-ESTABLISH CONNECTION
          </button>
        </div>
      </div>
    </div>
  );

  if (!apod) return null;

  const formatUrl = (url) => url?.replace("http://", "https://");
  
  const displayImage = formatUrl(apod.image || apod.hdImage);
  const isVideo = displayImage?.includes('youtube.com') || displayImage?.includes('vimeo.com');

  return (
    <div className="bg-galaxy p-6 flex flex-col items-center min-h-screen">
      <div className="max-w-5xl w-full mt-10">
        <header className="mb-12 text-center mt-10 relative">
          <div className="absolute -inset-x-20 -top-10 bottom-0 bg-black/40 blur-3xl -z-10 rounded-full" />

          <h2 className="text-amber-400/90 uppercase tracking-[0.5em] text-[10px] sm:text-xs font-black mb-4 
                drop-shadow-[0_2px_4px_rgba(0,0,0,1)] bg-amber-950/20 px-4 py-1 rounded-full border border-amber-500/30 inline-block">
            Astronomy Picture of the Day
          </h2>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            <span className="drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
              {apod.title}
            </span>
          </h1>

          <div className="mt-6 flex justify-center">
            <span className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-1 rounded-full text-xs font-mono backdrop-blur-md shadow-lg">
              Mission Date: {apod.date}
            </span>
          </div>
        </header>

        <div className="flex flex-col items-center">
          <div className="relative group w-full mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              {isVideo ? (
                <div className="aspect-video">
                  <iframe
                    src={displayImage}
                    title={apod.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={displayImage}
                  alt={apod.title}
                  className="w-full h-auto object-cover max-h-[75vh] mx-auto block"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/1200x800?text=Image+Data+Corrupted";
                  }}
                />
              )}
            </div>
          </div>

          <article className="bg-black/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl mb-10">
            <p className="leading-relaxed text-gray-100 text-lg selection:bg-blue-500/30">
              {apod.explanation}
            </p>
            
            {apod.hdImage && (
              <a 
                href={formatUrl(apod.hdImage)} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors border-b border-transparent hover:border-blue-300 pb-1"
              >
                Access High-Resolution Image →
              </a>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default Home;