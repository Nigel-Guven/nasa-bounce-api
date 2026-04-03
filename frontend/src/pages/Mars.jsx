import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loader.jsx';
import galaxy from '../assets/galaxy.jpg';

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
      setError('Could not retrieve Martian imagery. Ensure the rover was active on this date.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarsPhotos();
  }, [rover]); 

  return (
    <div
      className="p-6 min-h-screen w-full text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${galaxy})` }}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-orange-500 uppercase tracking-widest">
            Mars Surface Exploration
          </h1>
          
          <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-orange-900/30 inline-block w-full max-w-2xl">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {rovers.map((r) => (
                <button
                  key={r}
                  onClick={() => setRover(r)}
                  className={`px-6 py-2 rounded-full font-bold transition-all uppercase text-sm border ${
                    rover === r 
                      ? 'bg-orange-600 border-orange-400 shadow-[0_0_15px_rgba(234,88,12,0.5)]' 
                      : 'bg-gray-800 border-gray-600 hover:border-orange-500'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); fetchMarsPhotos(); }} className="flex gap-4 justify-center items-center">
              <input 
                type="date" 
                max={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
              />
              <button type="submit" className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-semibold border border-white/20 transition-colors">
                Sync Feeds
              </button>
            </form>
          </div>
        </header>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center p-10 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.length > 0 ? (
              photos.map((photo) => (
                <div key={photo.id} className="group relative bg-black/40 rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all">
                  <img 
                    src={photo.img_src} 
                    alt={`Mars by ${rover}`} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="p-4 bg-gradient-to-t from-black to-transparent">
                    <p className="text-xs text-orange-400 font-mono mb-1 uppercase">
                      {photo.camera.full_name}
                    </p>
                    <p className="text-sm text-gray-300">Sol: {photo.sol}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500 italic">
                No imagery found for {rover} on {date}. Try another solar date.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mars;