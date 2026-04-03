import React from 'react';
import galaxy from '../assets/galaxy.jpg';

const About = () => {
  const repoUrl = "https://github.com/Nigel-Guven/nasa-bounce-api";

  return (
    <div
      className="p-6 min-h-screen w-full text-white bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${galaxy})` }}
    >
      <div className="max-w-4xl bg-black/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl mt-10">
        <h1 className="text-4xl font-bold mb-6 text-center border-b border-gray-600 pb-4">
          Project Mission
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-gray-200">
          <p>
            This application serves as a sophisticated intermediary between enthusiasts and 
            <strong> NASA’s Open Data APIs</strong>. Designed as a full-stack exploration tool, 
            it bridges the gap between complex raw data and intuitive visual storytelling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-blue-300 mb-2">Deep Space Exploration</h3>
              <p>Visualizing data from the Astronomy Picture of the Day (APOD) and the extensive NASA Image & Video Library.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-red-300 mb-2">Planetary & Orbital Tracking</h3>
              <p>Real-time insights into Mars Rover imagery, Near Earth Objects (NEO), and live telemetry from the ISS and Artemis II.</p>
            </div>
          </div>

          <p>
            Built with a focus on <strong>UI/UX excellence</strong> and efficient API orchestration, 
            this project demonstrates modern full-stack capabilities using React, Node.js, and Express 
            to transform scientific datasets into an engaging cosmic experience.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 transition-colors rounded-full font-bold shadow-lg"
          >
            View GitHub Repository
          </a>
          <p className="mt-4 text-gray-400 text-sm italic">
            Developed as part of a two-week technical engineering challenge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;