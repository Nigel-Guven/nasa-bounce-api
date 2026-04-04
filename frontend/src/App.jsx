import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainLayout from './components/MainLayout'; // Import your new layout
import Home from './pages/Home';
import About from './pages/About';
import Mars from './pages/Mars';
import Neo from './pages/Neo';
import Search from './pages/Search';
import LiveFeed from './pages/LiveFeed';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/live" element={<LiveFeed />} />
          <Route path="/mars" element={<Mars />} />
          <Route path="/neo" element={<Neo />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;