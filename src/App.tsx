import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Main from './pages/Main';
import WatchProject from './pages/WatchProject';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="watch/:video_no" element={<WatchProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
