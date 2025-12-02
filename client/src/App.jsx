import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Stories from './components/Stories'
import Admin from './components/Admin';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

function App() {

  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/stories">Stories</Link> |{" "}
        <Link to="/politics">Politics</Link> |{" "}
        <Link to="/culture">Culture</Link> |{" "}
        <Link to="/sports">Sports</Link> |{" "}
        <Link to="/admin">Admin Dashboard</Link> |{" "}

      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/politics" element={<Stories theme="politics"/>} />
        <Route path="/culture" element={<Stories theme="culture"/>} />
        <Route path="/sports" element={<Stories theme="sports"/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
