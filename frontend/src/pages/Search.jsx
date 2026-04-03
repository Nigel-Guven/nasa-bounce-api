import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loader.jsx';
import galaxy from '../assets/galaxy.jpg';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:5000/api/search`, {
        params: { q: query }
      });
      
      setResults(response.data); 
      
      if (response.data.length === 0) {
        setError('No artifacts found for this sector of space.');
      }
    } catch (err) {
      setError('Communication with the Archive failed. Please try again.');
      console.error("Search Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-6 min-h-screen w-full text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${galaxy})` }}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 pb-2">
            Cosmic Archive
          </h1>
          <p className="text-gray-300 mb-8 text-lg">Search the NASA Image and Video Library.</p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search 'Black Hole', 'Nebula', 'Apollo'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-gray-900/80 border-2 border-gray-700 rounded-full py-4 px-8 outline-none focus:border-blue-500 transition-all text-lg backdrop-blur-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 px-8 rounded-full font-bold transition-colors shadow-lg"
            >
              Search
            </button>
          </form>
          {error && <p className="mt-4 text-red-400 font-medium italic">{error}</p>}
        </header>

        {loading ? (
          <Loading />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {results.map((item, index) => {
              const { title, description, image } = item;

              if (!image) return null;

              return (
                <div 
                  key={index} 
                  className="break-inside-avoid bg-gray-900/60 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 group shadow-2xl"
                >
                  <img
                    src={image}
                    alt={title || 'NASA Image'}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="font-bold text-blue-300 text-sm mb-2 line-clamp-2">
                      {title || 'Untitled Discovery'}
                    </h3>
                    
                    <button 
                      onClick={() => alert(description || 'No description available for this artifact.')}
                      className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors border-b border-gray-700 hover:border-white pb-1"
                    >
                      View Intelligence [+]
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {!loading && results.length === 0 && !error && (
          <div className="text-center py-20 text-gray-500 italic">
            Awaiting search coordinates...
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;