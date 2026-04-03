import React, { useState, useMemo } from 'react';
import { useNEO } from '../hooks/useNeo';
import Loading from '../components/Loader.jsx';

const NEO = () => {
  const getFormattedDate = (date) => date.toISOString().split('T')[0];
  const todayStr = getFormattedDate(new Date());
  
  const [dates, setDates] = useState({ start: todayStr, end: todayStr });
  const [searchParams, setSearchParams] = useState({ start: todayStr, end: todayStr });
  const [validationError, setValidationError] = useState('');
  
  const [filterHazardous, setFilterHazardous] = useState(false);
  const [sortBy, setSortBy] = useState('date'); 

  const { data, loading, error } = useNEO(searchParams);

  const handleSearch = (e) => {
    e.preventDefault();
    setValidationError('');
    const startDate = new Date(dates.start);
    const endDate = new Date(dates.end);
    const diffDays = Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24));

    if (startDate > endDate) return setValidationError("Temporal Error: Start date follows end date.");
    if (diffDays > 7) return setValidationError("Sensor Limit: Maximum 7-day range allowed.");

    setSearchParams(dates);
  };

  const processedAsteroids = useMemo(() => {
    if (!data) return [];
    let list = data.flatMap(day => day.asteroids);
    if (filterHazardous) list = list.filter(a => a.hazardous);

    return list.sort((a, b) => {
      if (sortBy === 'size') return b.diameter - a.diameter;
      if (sortBy === 'speed') return b.speed - a.speed;
      return 0; 
    });
  }, [data, filterHazardous, sortBy]);

  if (loading) return <Loading />;

  return (
    <div className="bg-galaxy p-6 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <header className="mb-10 text-center mt-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-white uppercase tracking-tight">
            Near Earth <span className="text-blue-500">Objects</span>
          </h1>

          <form onSubmit={handleSearch} className="flex flex-wrap justify-center items-end gap-4 bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col items-start">
              <label className="text-[10px] uppercase text-cyan-200/70 mb-1 font-black ml-1 tracking-widest">Range Start</label>
              <input type="date" max={todayStr} value={dates.start} onChange={(e) => setDates({ ...dates, start: e.target.value })}
                className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 outline-none focus:border-blue-500 text-blue-400 font-mono text-sm" />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-[10px] uppercase text-cyan-200/70 mb-1 font-black ml-1 tracking-widest">Range End</label>
              <input type="date" max={todayStr} value={dates.end} onChange={(e) => setDates({ ...dates, end: e.target.value })}
                className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 outline-none focus:border-blue-500 text-blue-400 font-mono text-sm" />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg active:scale-95">
              Initialize Scan
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-6 mt-10 items-center text-xs font-black uppercase tracking-[0.2em]">
  
          <label className="flex items-center gap-3 cursor-pointer group bg-white/10 px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg">
            <input 
              type="checkbox" 
              checked={filterHazardous} 
              onChange={() => setFilterHazardous(!filterHazardous)} 
              className="hidden" 
            />
            <span className={`w-3.5 h-3.5 rounded-sm transition-all shadow-[0_0_10px] ${
              filterHazardous ? 'bg-red-500 shadow-red-500' : 'bg-slate-600 shadow-transparent'
            }`} />
            <span className={`${
              filterHazardous ? 'text-red-400' : 'text-cyan-50'
            } drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
              Hazardous Only
            </span>
          </label>

          <div className="flex items-center gap-6 bg-black/60 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-2xl">
            <span className="text-cyan-500/80 text-[11px] tracking-[0.3em]">SORT BY:</span>
            {['date', 'size', 'speed'].map((type) => (
              <button 
                key={type}
                onClick={() => setSortBy(type)} 
                className={`transition-all hover:text-white uppercase tracking-widest ${
                  sortBy === type 
                    ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] scale-110' 
                    : 'text-cyan-100/60 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        </header>

        {/* --- ERROR STATE --- */}
        {(validationError || error) ? (
          <div className="max-w-2xl mx-auto mt-20">
            <div className="bg-red-950/40 backdrop-blur-xl border-2 border-red-500/50 p-10 rounded-3xl shadow-[0_0_40px_rgba(239,68,68,0.15)] text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 border border-red-500 mb-6">
                <span className="text-red-500 font-black text-2xl">!</span>
              </div>
              <h3 className="text-white font-black text-xl mb-3 uppercase tracking-tighter text-shadow-lg">Sensor Failure</h3>
              <p className="text-red-200/90 font-medium leading-relaxed drop-shadow-md">{validationError || error}</p>
            </div>
          </div>
        ) : (
          /* --- NEO GRID --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {processedAsteroids.map((asteroid) => (
              <div key={asteroid.id} className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 p-7 rounded-3xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors uppercase italic drop-shadow-md">
                      {asteroid.name.replace(/[()]/g, '')}
                    </h2>
                    <p className="text-[9px] text-cyan-200/40 font-mono uppercase tracking-[0.3em] mt-2">Object ID // {asteroid.id}</p>
                  </div>
                  {asteroid.hazardous && (
                    <span className="bg-red-600/20 text-red-500 border border-red-500/40 text-[9px] px-3 py-1 rounded-md animate-pulse font-black tracking-widest">
                      DANGER
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                    <span className="text-[10px] text-cyan-100/70 uppercase font-black tracking-[0.2em] drop-shadow-md">
                      Max Diameter
                    </span>
                    <span className="text-sm font-mono text-blue-300 font-black">
                      {Math.round(asteroid.diameter)}<span className="text-[10px] ml-0.5">m</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                    <span className="text-[10px] text-cyan-100/70 uppercase font-black tracking-[0.2em] drop-shadow-md">
                      Rel Velocity
                    </span>
                    <span className="text-sm font-mono text-cyan-400 font-black">
                      {Math.round(asteroid.speed).toLocaleString()}<span className="text-[10px] ml-0.5 uppercase">km/h</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4">
                    <span className="text-[10px] text-cyan-100/70 uppercase font-black tracking-[0.2em] drop-shadow-md">
                      Miss Distance
                    </span>
                    <span className="text-sm font-mono text-amber-500 font-black drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                      {(Math.round(asteroid.missDistance) / 1000000).toFixed(2)}M km
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NEO;