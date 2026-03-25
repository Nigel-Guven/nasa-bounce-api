import React, { useEffect, useState } from 'react';
import api from '../api/api';

const APOD = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const res = await api.get('/apod');
        setApod(res.data);
      } catch (err) {
        setError('Failed to fetch APOD');
      } finally {
        setLoading(false);
      }
    };
    fetchAPOD();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">{apod.title}</h1>
      {apod.media_type === 'image' ? (
        <img src={apod.url} alt={apod.title} className="mx-auto rounded-lg shadow-lg" />
      ) : (
        <iframe src={apod.url} title={apod.title} className="w-full h-96 rounded-lg shadow-lg"></iframe>
      )}
      <p className="mt-4 text-gray-300">{apod.explanation}</p>
    </div>
  );
};

export default APOD;