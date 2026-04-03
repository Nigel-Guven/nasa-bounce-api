import React from 'react';

const About = () => {
  const repoUrl = "https://github.com/Nigel-Guven/nasa-bounce-api";

  return (
    <div className="bg-galaxy p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full mt-10 mb-20">
        
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <h2 className="mx-4 text-cyan-400 uppercase tracking-[0.5em] text-[10px] font-black drop-shadow-md">
              System Documentation
            </h2>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
            Project <span className="text-blue-500">Mission</span>
          </h1>
        </header>

        <div className="bg-black/60 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -z-10" />

          <div className="space-y-8 text-lg leading-relaxed text-gray-200">
            <p className="font-light italic border-l-4 border-blue-500 pl-6 py-2 bg-blue-500/5">
              This application serves as a gateway between enthusiasts and the 
              <strong><a href="https://api.nasa.gov/" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 mx-1 underline underline-offset-4 decoration-blue-500/30 transition-all"> NASA Open API</a></strong>. 
              Designed as a full-stack exploration tool, it bridges the gap between complex raw data and intuitive visual storytelling.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <h3 className="font-black text-blue-300 uppercase text-xs tracking-widest">Deep Space Exploration</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                  Visualizing data from the Astronomy Picture of the Day (APOD) and the extensive NASA Image & Video Library.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                  <h3 className="font-black text-orange-400 uppercase text-xs tracking-widest">Planetary Tracking</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                  Real-time insights into Mars Rover imagery, Near Earth Objects (NEO), and live telemetry from the ISS.
                </p>
              </div>
            </div>

            <p className="text-base text-gray-300">
              Built with a focus on efficient **API orchestration**, this project demonstrates modern full-stack capabilities using **React, Node.js, and Express**.
            </p>

            <div className="pt-8 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                Developed by 
                <a href="https://github.com/Nigel-Guven" target="_blank" rel="noreferrer" className="text-amber-400 font-bold mx-1 hover:text-amber-300 transition-colors">
                  Nigel Guven
                </a> 
                as a technical demonstration for 
                <a href="https://www.bounceinsights.com" target="_blank" rel="noreferrer" className="text-cyan-400 font-bold mx-1 hover:text-cyan-300 transition-colors">
                  Bounce Insights
                </a>.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-10 py-4 font-black text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] overflow-hidden"
            >
              <span className="relative z-10 uppercase tracking-widest text-xs">Access Source Code Repository</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;