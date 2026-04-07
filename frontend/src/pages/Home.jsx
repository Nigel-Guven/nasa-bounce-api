import React, { useState, useEffect } from 'react';
import { useAPOD } from '../hooks/useApod'; 
import Loading from '../components/Loader.jsx';
import earthFallback from '../assets/earth.jpg'; 

const Home = () => {
  const { data: apod, loading, error } = useAPOD();
  const [imgSrc, setImgSrc] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    if (apod) {
      // Use the 'image' key confirmed in your JSON
      // We also check for 'url' just in case the model changes later
      const validUrl = apod.image || apod.url;
      if (validUrl) {
        setImgSrc(validUrl.replace("http://", "https://"));
        setIsFallback(false);
      } else {
        setImgSrc(earthFallback);
        setIsFallback(true);
      }
    }
  }, [apod]);

  const handleImageError = () => {
    console.warn("NASA Image failed to load. Switching to Earth archive.");
    setImgSrc(earthFallback);
    setIsFallback(true);
  };

  if (loading) return <Loading />;

  // If there's a hard API error (404/500), use Earth immediately
  const activeTitle = (error || isFallback) ? "Earth: System Standby" : apod?.title;
  const activeDate = (error || isFallback) ? "OFFLINE" : apod?.date;

  return (
    <div className="bg-galaxy min-h-screen p-6 text-white selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto mt-10">
        
        {/* Header */}
        <header className="text-center mb-12 relative">
          <div className="absolute -inset-x-20 -top-10 bottom-0 bg-blue-900/10 blur-3xl -z-10 rounded-full" />
          <h2 className={`uppercase tracking-[0.4em] text-[10px] font-bold mb-4 px-4 py-1 rounded-full border inline-block
            ${(error || isFallback) ? 'text-red-400 border-red-500/30' : 'text-amber-400 border-amber-500/30'}`}>
            Astronomy Picture of the Day
          </h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-2xl">
            {activeTitle}
          </h1>
          <div className="mt-6 flex justify-center">
            <span className={`px-4 py-1 rounded-full text-xs font-mono backdrop-blur-md border 
              ${(error || isFallback) ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-blue-500/10 border-blue-500/30 text-blue-300'}`}>
              MISSION DATE: {activeDate}
            </span>
          </div>
        </header>

        {/* Media Container */}
        <div className="relative group mx-auto w-full mb-10">
          <div className={`absolute -inset-1 rounded-2xl blur opacity-15 transition duration-1000 bg-gradient-to-r 
            ${(error || isFallback) ? 'from-red-600 to-orange-600' : 'from-blue-600 to-cyan-500'}`} />
          
          <div className="relative bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center min-h-[300px]">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={imgSrc || earthFallback}
              alt={activeTitle}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
              // 'object-contain' ensures the wide Blue Horsehead doesn't get cropped
              className={`w-full h-auto object-contain max-h-[80vh] transition-all duration-1000
                ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            />
          </div>
        </div>

        {/* Info Article */}
        <article className="p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-inner">
          <p className={`text-lg leading-relaxed font-light ${isFallback ? 'text-red-100/60 italic' : 'text-gray-200'}`}>
            {(error || isFallback) 
              ? "Communication signal lost. Displaying local planetary fallback. Please check your deep space uplink connection." 
              : apod?.explanation}
          </p>
          
          {/* High Res Link */}
          {!isFallback && apod?.hdImage && (
            <a 
              href={apod.hdImage} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block mt-8 text-xs font-bold text-blue-400 hover:text-blue-200 transition-all uppercase tracking-widest border-b border-blue-500/30 pb-1"
            >
              Access High-Resolution Uplink →
            </a>
          )}
        </article>
      </div>
    </div>
  );
};

export default Home;