import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ConbentLogo from '../assets/conbent logo color line.svg';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(15, 139, 253, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 139, 253, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.25;
  z-index: 0;
`;

const HeroContent = styled.div`
  text-align: center;
  margin-top: -6rem;
  max-width: 45rem;
  z-index: 2;
`;

const GlassCard = styled.div`
  backdrop-filter: blur(6px) saturate(110%);
  -webkit-backdrop-filter: blur(6px) saturate(110%);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 4rem;
  padding: 4rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
`;

const Headline = styled.h1`
  font-size: clamp(1rem, 3vw, 2rem);
  font-weight: 700;
  margin-bottom: 1.2rem;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

`;

const Subheadline = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: #cccccc;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #0f8bfd, #00d4ff);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(15, 139, 253, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(15, 139, 253, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;


const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap } = await import('gsap');
      
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelector('h1'), 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
        
        gsap.fromTo(heroRef.current.querySelector('p'), 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
        );
        
        gsap.fromTo(heroRef.current.querySelector('button'), 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" }
        );
      }
    };

    initAnimation();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="hero" ref={heroRef}>
      <BackgroundGrid />
      
      <HeroContent>
        <GlassCard>
          <img style={{ height: '78px', marginBottom: '2rem' }} src={ConbentLogo} alt="Conbent Logo" />
          <Headline>
           <div> Local-first BIM data control.</div>
          </Headline>
          <Subheadline>
          Automated checks, and model tracking. Save time, reduce errors, and stay in control of your BIM project changes.
          </Subheadline>
          <CTAButton onClick={scrollToContact}>
            Request a Demo
          </CTAButton>
        </GlassCard>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
