import React from 'react';

const LiveFeed = () => {
  const feeds = [
    {
      title: "NASA TV: Artemis II Live Footage",
      videoId: "m3kR2KK8TEs", 
      description: "Direct broadcast of the Artemis II lunar mission and coverage highlights."
    }, 
    {
      title: "Orion: Live Satellite Footage",
      videoId: "6RwfNBtepa4", 
      description: "Live video from the Orion Satellite."
    },
    {
      title: "ISS: Live feed of the Space Station",
      videoId: "sWasdbDVNvc", 
      description: "Live video of the International Space Station."
    },
    {
      title: "ISS: Live HD Views of Earth",
      videoId: "zPH5KtjJFaQ", 
      description: "Live HD video of Earth view from the International Space Station."
    }
  ];

  return (
    <div className="bg-galaxy p-6 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        
        <header className="mb-12 text-center mt-10">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500/50" />
            <h2 className="mx-4 text-amber-400 uppercase tracking-[0.5em] text-[10px] font-black drop-shadow-md">
              Real-Time Telemetry
            </h2>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.1em] drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
            Live Cosmic <span className="text-orange-500">Feeds</span>
          </h1>
          
          <p className="mt-4 text-blue-300/60 font-mono text-[10px] uppercase tracking-[0.2em] bg-white/5 backdrop-blur-sm px-4 py-1 rounded-full border border-white/10 inline-block">
            Status: Uplink Established // Signal Strength: Optimal
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto mb-20">
          {feeds.map((feed) => (
            <div 
              key={feed.videoId} 
              className="group bg-black/40 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/10 hover:border-orange-500/40 transition-all duration-500"
            >
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl mb-6 shadow-inner ring-1 ring-white/10">
                <iframe
                  className="absolute top-0 left-0 w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  src={`https://www.youtube.com/embed/${feed.videoId}?autoplay=0&rel=0&modestbranding=1`}
                  title={feed.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="px-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <h2 className="text-xl font-black text-blue-300 tracking-tight group-hover:text-white transition-colors">
                    {feed.title}
                  </h2>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed font-medium border-l-2 border-white/10 pl-4 py-1">
                  {feed.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LiveFeed;