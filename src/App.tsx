import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import WatchProject from './pages/WatchProject';
import { useEffect } from 'react';
import { NotFound } from './pages/NotFound';
import { Layout } from './pages/Layout';

function App() {
  useEffect(() => {
    const follower = document.querySelector(".follower") as HTMLElement;

    if (!follower || window.innerWidth < 768) {
      if (follower) follower.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - 10;
      mouseY = e.clientY - 10;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      follower.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/watch/:video_no" element={<WatchProject />} />
        </Route>

        {/* 404 without navbar */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
