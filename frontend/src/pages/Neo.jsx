import React, { useState } from 'react';
import { useNEO } from '../hooks/useNeo';
import Loading from '../components/Loader.jsx';
import galaxy from '../assets/galaxy.jpg';

const NEO = () => {
  const getFormattedDate = (date) => date.toISOString().split('T')[0];

  const todayStr = getFormattedDate(new Date());
  
  const [dates, setDates] = useState({ start: todayStr, end: todayStr });
  const [searchParams, setSearchParams] = useState({ start: todayStr, end: todayStr });
  const [validationError, setValidationError] = useState('');

  const { data, loading, error } = useNEO(searchParams);

  const handleSearch = (e) => {
    e.preventDefault();
    setValidationError('');

    const startDate = new Date(dates.start);
    const endDate = new Date(dates.end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (startDate > endDate) {
      setValidationError("Start date cannot be after end date.");
      return;
    }
    if (diffDays > 7) {
      setValidationError("NASA only allows a maximum search of 7 days.");
      return;
    }

    setSearchParams(dates);
  };

  if (loading) return <Loading />;

  const allAsteroids = data ? data.flatMap(day => day.asteroids) : [];

  return (
    <div
      className="p-6 min-h-screen w-full text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${galaxy})` }}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-blue-400">NEO Tracker</h1>
          <p className="text-gray-400 mb-6">Search history for Near Earth Objects (Max 7-day range)</p>

          <form 
            onSubmit={handleSearch}
            className="flex flex-wrap justify-center items-end gap-4 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10"
          >
            <div className="flex flex-col items-start">
              <label className="text-xs uppercase text-gray-300 mb-1">Start Date</label>
              <input 
                type="date" 
                max={todayStr} 
                value={dates.start}
                onChange={(e) => setDates({ ...dates, start: e.target.value })}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-xs uppercase text-gray-300 mb-1">End Date</label>
              <input 
                type="date" 
                max={todayStr}
                value={dates.end}
                onChange={(e) => setDates({ ...dates, end: e.target.value })}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-8 py-2 rounded-lg font-bold">
              Search
            </button>
          </form>

          {(validationError || error) && (
            <p className="text-red-400 mt-4 bg-red-900/20 py-2 px-4 rounded-lg inline-block border border-red-500/50">
              {validationError || error}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAsteroids.map((asteroid) => (
            <div key={asteroid.id} className="bg-gray-900/80 backdrop-blur-md border border-gray-700 p-5 rounded-xl hover:border-blue-400 transition-colors shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-blue-300 truncate w-3/4">{asteroid.name}</h2>
                {asteroid.hazardous && (
                  <span className="bg-red-600 text-[10px] px-2 py-1 rounded-full animate-pulse font-bold">HAZARDOUS</span>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Max Diameter</span>
                  <span className="text-white">{Math.round(asteroid.diameter)} m</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Speed</span>
                  <span className="text-white">{Math.round(asteroid.speed).toLocaleString()} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>Miss Distance</span>
                  <span className="text-yellow-500 font-mono">
                    {Math.round(asteroid.missDistance).toLocaleString()} km
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NEO;