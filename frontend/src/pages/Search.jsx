import React, { useState } from 'react';
import api from '../api/client';
import Loading from '../components/Loader.jsx';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/search`, {
        params: { q: query }
      });
      
      setResults(response.data); 
      
      if (response.data.length === 0) {
        setError('No artifacts found for this sector of space. Refine your search coordinates.');
      }
    } catch (err) {
      setError('Communication with the Archive failed. Satellite link unstable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-galaxy p-6 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <header className="mb-12 text-center mt-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white uppercase tracking-tighter drop-shadow-2xl">
            NASA <span className="text-blue-500">Archive</span>
          </h1>

          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group">
            <input
              type="text"
              placeholder="Search 'Black Hole', 'Nebula', 'Apollo'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black/60 border-2 border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-blue-500/50 focus:bg-black/80 transition-all text-lg backdrop-blur-xl text-blue-100 placeholder:text-gray-600 shadow-2xl font-medium"
            />
            <button
              type="submit"
              className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-blue-500 px-10 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg active:scale-95 text-white"
            >
              Search
            </button>
          </form>
        </header>

        {error ? (
          <div className="max-w-2xl mx-auto mt-20">
            <div className="bg-red-950/40 backdrop-blur-xl border-2 border-red-500/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(239,68,68,0.15)] text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 border border-red-500 mb-6">
                <span className="text-red-500 font-black text-2xl">!</span>
              </div>
              <h3 className="text-white font-black text-xl mb-3 uppercase tracking-tighter">Archive Error</h3>
              <p className="text-red-200/80 font-medium leading-relaxed">{error}</p>
              <button 
                onClick={() => {setQuery(''); setError('');}}
                className="mt-8 px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-red-400 hover:text-white border border-red-500/30 hover:border-white rounded-lg transition-all"
              >
                Reset Search Frequency
              </button>
            </div>
          </div>
        ) : loading ? (
          <Loading />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8 mb-20">
            {results.map((item, index) => (
              item.image && (
                <div 
                  key={index} 
                  onClick={() => setSelectedArtifact(item)}
                  className="break-inside-avoid bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 cursor-pointer group shadow-2xl relative"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="p-5 bg-gradient-to-t from-black via-black/40 to-transparent">
                    <h3 className="font-black text-white text-xs uppercase tracking-wide mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {item.title || 'Untitled Discovery'}
                    </h3>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400/60 font-bold border-t border-white/10 pt-2 block">
                      Intel Briefing [+]
                    </span>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {!loading && results.length === 0 && !error && (
          <div className="text-center py-32 opacity-30">
            <p className="text-blue-300 tracking-[0.5em] uppercase text-xs font-black animate-pulse">
              Awaiting Search Coordinates
            </p>
          </div>
        )}
      </div>

      {selectedArtifact && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedArtifact(null)}
        >
          <div 
            className="bg-slate-950 border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedArtifact(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white font-bold transition-all"
            >
              ✕
            </button>

            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden bg-black">
              <img 
                src={selectedArtifact.image} 
                className="w-full h-full object-contain md:object-cover"
                alt={selectedArtifact.title}
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-gradient-to-br from-slate-900 to-black">
              <h2 className="text-cyan-400 uppercase tracking-[0.3em] text-[10px] font-black mb-4">
                Classified Intelligence
              </h2>
              <h1 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
                {selectedArtifact.title}
              </h1>
              <div className="h-[2px] w-20 bg-blue-600 mb-8" />
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {selectedArtifact.description || 'No detailed data available for this sector.'}
              </p>
              
              <div className="mt-10 pt-10 border-t border-white/5">
                <p className="text-slate-500 font-mono text-[10px] uppercase">
                  Data Source: NASA Archive // ID: {selectedArtifact.id || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;