import React from 'react';
import { useAPOD } from '../hooks/useApod'; // Ensure the case matches your filename
import Loading from '../components/Loader.jsx';
import galaxy from '../assets/galaxy.jpg';

const Home = () => {
  // The hook now handles loading, error, and data states internally
  const { data: apod, loading, error } = useAPOD();

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!apod) return null;

  return (
    <div
      className="p-6 min-h-screen w-full text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${galaxy})` }}
    >
      <h1 className="text-4xl font-bold mb-4 text-center">{apod.title}</h1>
      
      <div className="flex flex-col items-center">
        {apod.media_type === 'image' ? (
          <img
            src={apod.url}
            alt={apod.title}
            className="rounded-lg shadow-lg max-w-full"
          />
        ) : (
          <iframe
            src={apod.url}
            title={apod.title}
            className="w-full max-w-3xl h-96 rounded-lg shadow-lg"
            allowFullScreen
          />
        )}
        <p className="mt-4 max-w-3xl text-gray-300 text-center">
          {apod.explanation}
        </p>
      </div>
    </div>
  );
};

export default Home;