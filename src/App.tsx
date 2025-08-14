import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatIs from './components/WhatIs';
import Why from './components/Why';
import Features from './components/Features';
import Audit from './components/Audit';
import DesktopCarousel from './components/DesktopCarousel';
import OnlineControll from './components/OnlineControll.tsx';
import Visualization from './components/Visualization';
import Contact from './components/Contact';
import WaveBackground from './components/WaveBackground.tsx';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Smooth reveal for each main section on scroll
      const sections = document.querySelectorAll('main > section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section as Element,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    };
    
    initGSAP();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <WaveBackground />
        <main>
          <Hero />
          <WhatIs />
          <Why />
          <Features />
          <DesktopCarousel />
          <OnlineControll />
          <Audit />
          <Visualization />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
