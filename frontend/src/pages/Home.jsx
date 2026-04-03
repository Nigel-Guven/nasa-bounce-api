import React from 'react';
import { useAPOD } from '../hooks/useApod'; 
import Loading from '../components/Loader.jsx';

const Home = () => {
  const { data: apod, loading, error } = useAPOD();

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen text-red-400">
      <div className="bg-red-900/20 border border-red-500 p-6 rounded-xl">
        {error}
      </div>
    </div>
  );

  if (!apod) return null;

  // Using your flattened ApodImage Model properties
  const displayImage = apod.image || apod.hdImage;

  return (
    /* We removed 'min-h-screen', 'bg-cover', etc., and replaced them with 'bg-galaxy'.
       The background-image is now handled globally by your CSS.
    */
    <div className="bg-galaxy p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full mt-10">
        <header className="mb-12 text-center mt-10 relative">
          {/* The Scrim: This invisible box ensures the text always has a dark backdrop */}
          <div className="absolute -inset-x-20 -top-10 bottom-0 bg-black/40 blur-3xl -z-10 rounded-full" />

          <h2 className="text-amber-400/90 uppercase tracking-[0.5em] text-[10px] sm:text-xs font-black mb-4 
               drop-shadow-[0_2px_4px_rgba(0,0,0,1)] bg-amber-950/20 px-4 py-1 rounded-full border border-amber-500/30 inline-block">
            Astronomy Picture of the Day
          </h2>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {/* Outline + Shadow combo for maximum clarity */}
            <span className="drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
              {apod.title}
            </span>
          </h1>

          <div className="mt-6 flex justify-center">
            <span className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-1 rounded-full text-xs font-mono backdrop-blur-md shadow-lg">
            Date Today: {apod.date}
            </span>
          </div>
        </header>

        <div className="flex flex-col items-center">
          <div className="relative group w-full mb-8">
            {/* Aesthetic Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              {displayImage?.includes('youtube.com') || displayImage?.includes('vimeo.com') ? (
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
                  className="w-full h-auto object-cover max-h-[75vh] mx-auto"
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
                href={apod.hdImage} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors border-b border-transparent hover:border-blue-300 pb-1"
              >
                View High-Resolution Original →
              </a>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default Home;