import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Mars from './pages/Mars';
import Neo from './pages/Neo';
import Search from './pages/Search';
import LiveFeed from './pages/LiveFeed';

function App() {
  return (
    <Router>
      <div className="flex bg-slate-900 min-h-screen text-white">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/live" element={<LiveFeed />} />
            <Route path="/mars" element={<Mars />} />
            <Route path="/neo" element={<Neo />} />
            <Route path="/search" element={<Search />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;