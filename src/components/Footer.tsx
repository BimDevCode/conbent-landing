import React from 'react';
import styled from 'styled-components';
import ConbentLogo from '../assets/conbent logo color line.svg';

const FooterContainer = styled.footer`
  margin-top: 4rem;
  border-top: 1px solid rgba(15, 139, 253, 0.2);
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #e9e9e9;
`;

const BrandLogo = styled.img`
  height: 40px;
  width: auto;
`;

const BrandText = styled.p`
  color: #bdbdbd;
  max-width: 560px;
  line-height: 1.6;
`;

const Col = styled.div``;

const ColTitle = styled.h4`
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
`;

const FooterLink = styled.button`
  text-align: left;
  background: transparent;
  border: none;
  color: #bdbdbd;
  cursor: pointer;
  font: inherit;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

const BottomBar = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: #a9a9a9;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const InlineLink = styled.a`
  color: #a9a9a9;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
    }
  };

  return (
    <FooterContainer id="footer">
      <FooterInner>
        <Columns>
          <Brand>
            <BrandLogo src={ConbentLogo} alt="Conbent" />
            <BrandText>
              Local-first BIM change control for teams that value speed, privacy, and full ownership of their data.
            </BrandText>
          </Brand>

          <Col>
            <ColTitle>Explore</ColTitle>
            <LinkList>
              <li><FooterLink onClick={() => scrollToSection('what-is')}>Solution</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('features')}>Features</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('online-controll')}>Web</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('desktop')}>Desktop</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('visualization')}>3D Visualization</FooterLink></li>
              <li><FooterLink onClick={() => scrollToSection('contact')}>Contact</FooterLink></li>
            </LinkList>
          </Col>

          <Col>
            <ColTitle>Contact</ColTitle>
            <LinkList>
              <li>
                <InlineLink href="mailto:hello@conbent.com">hello@conbent.com</InlineLink>
              </li>
              <li>
                <FooterLink onClick={() => scrollToSection('contact')}>Request a Demo</FooterLink>
              </li>
            </LinkList>
          </Col>
        </Columns>

        <BottomBar>
          <div>© {currentYear} Conbent. All rights reserved.</div>
          <BottomLinks>
            <InlineLink href="#" onClick={(e) => e.preventDefault()}>Privacy</InlineLink>
            <InlineLink href="#" onClick={(e) => e.preventDefault()}>Terms</InlineLink>
          </BottomLinks>
        </BottomBar>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;


