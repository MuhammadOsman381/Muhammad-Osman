import { useState } from 'react'
import './App.css'
import Main from './pages/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WatchProject from './pages/WatchProject'
import NavBar from './components/NavBar'

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  return (
    <>
      <BrowserRouter>
        <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route path="/" element={<Main isDarkMode={isDarkMode} />} />
          <Route path="watch/:video_no" element={<WatchProject isDarkMode={isDarkMode} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
