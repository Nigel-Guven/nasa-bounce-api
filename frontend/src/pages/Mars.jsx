import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loader.jsx';

const Mars = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const [rover, setRover] = useState('curiosity');
  const [date, setDate] = useState('2023-01-01'); 
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const rovers = ['curiosity', 'opportunity', 'spirit'];

  const fetchMarsPhotos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/mars`, {
        params: { rover, date }
      });
      setPhotos(response.data.photos || response.data); 
    } catch (err) {
      setError('Houston, we have a problem.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarsPhotos();
  }, [rover]); 

  return (
    <div className="bg-galaxy p-6 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        
        <header className="mb-12 text-center mt-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-orange-500 uppercase tracking-[0.2em] drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
            Mars Exploration
          </h1>
          
          <div className="bg-black/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl inline-block w-full max-w-3xl">
            <p className="text-orange-300/60 text-[10px] uppercase tracking-[0.3em] font-bold mb-4">
              Select Active Rover Unit
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {rovers.map((r) => (
                <button
                  key={r}
                  onClick={() => setRover(r)}
                  className={`px-8 py-3 rounded-xl font-black transition-all uppercase text-xs tracking-widest border-2 ${
                    rover === r 
                      ? 'bg-orange-600 border-orange-400 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] scale-105' 
                      : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-orange-500/50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); fetchMarsPhotos(); }} 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-white/5 pt-6"
            >
              <div className="flex flex-col items-start">
                <label className="text-[10px] text-gray-500 uppercase mb-1 ml-1 font-bold">Earth Date</label>
                <input 
                  type="date" 
                  max={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-950 border border-gray-800 rounded-xl px-5 py-3 outline-none focus:border-orange-500 transition-colors text-orange-400 font-mono"
                />
              </div>
              <button 
                type="submit" 
                className="sm:mt-5 bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white px-8 py-3 rounded-xl font-bold border border-orange-500/50 transition-all duration-300"
              >
                Sync Satellite Feed
              </button>
            </form>
          </div>
        </header>

        {loading ? (
          <div className="py-20"><Loading /></div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-950/40 backdrop-blur-xl border-2 border-red-500/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(239,68,68,0.15)] text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 border border-red-500 mb-6">
                <span className="text-red-500 font-black text-2xl">!</span>
              </div>
              <h3 className="text-white font-black text-xl mb-3 uppercase tracking-tighter">Signal Interference</h3>
              <p className="text-red-200/80 font-medium leading-relaxed">{error}</p>
              <button 
                onClick={fetchMarsPhotos}
                className="mt-8 px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-red-400 hover:text-white border border-red-500/30 hover:border-white rounded-lg transition-all"
              >
                Re-Establish Uplink
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
            {photos.length > 0 ? (
              photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="group relative bg-slate-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={photo.img_src} 
                      alt={`Mars Surface - ${rover}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-5 relative">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-1 rounded font-black uppercase tracking-tighter border border-orange-500/20">
                        {photo.camera.name}
                      </span>
                      <span className="text-gray-500 font-mono text-[10px]">SOL {photo.sol}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium leading-tight line-clamp-1">
                      {photo.camera.full_name}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-2 italic font-mono">
                      Target: {rover.toUpperCase()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-32 bg-black/20 backdrop-blur-md rounded-3xl border border-white/5">
                <p className="text-gray-500 italic tracking-widest text-sm">
                  NO VISUAL DATA ARCHIVED FOR THIS COORDINATE.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mars;