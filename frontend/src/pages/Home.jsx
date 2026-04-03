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
        <header className="mb-8 text-center">
          <h2 className="text-blue-400 uppercase tracking-widest text-xs font-bold mb-2">
            Astronomy Picture of the Day
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-2xl">
            {apod.title}
          </h1>
          <p className="text-gray-400 mt-2 font-mono">{apod.date}</p>
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