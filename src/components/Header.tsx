import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ConbentLogo from '../assets/conbent_logo_color.svg';

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(25px);
  border-bottom: ${props => props.scrolled ? '1px solid rgba(15, 139, 253, 0.3)' : 'none'};
  transition: all 0.3s ease;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  margin: 0 auto;
  display: flex;
  padding-right: 6rem;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Logo = styled.div`
  height: 48px;
  cursor: pointer;
  img {
    height: 100%;
    object-fit: contain;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(40, 40, 40, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.3s ease;
    border-top: 1px solid rgba(15, 139, 253, 0.3);
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color:rgb(107, 180, 254);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    margin-left: auto;
  }
`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = async (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    try {
      const { gsap } = await import('gsap');
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
      gsap.registerPlugin(ScrollToPlugin);
      gsap.to(window, {
        duration: 0.8,
        ease: 'power2.out',
        scrollTo: { y: element, offsetY: 80 }
      });
    } catch (_err) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      setMobileMenuOpen(false);
    }
  };

  return (
    <HeaderContainer scrolled={scrolled}>
        <Logo onClick={() => scrollToSection('hero')}>
          <img src={ConbentLogo} alt="Conbent Logo" />
        </Logo>
      <Nav>
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
        <NavLinks isOpen={mobileMenuOpen}>
          <NavLink onClick={() => scrollToSection('what-is')}>Solution</NavLink>
          <NavLink onClick={() => scrollToSection('features')}>Features</NavLink>
          <NavLink onClick={() => scrollToSection('desktop')}>Desktop Solution</NavLink>
          <NavLink onClick={() => scrollToSection('online-controll')}>Online Solution</NavLink>
          <NavLink onClick={() => scrollToSection('audit')}>Audit</NavLink>
          <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
