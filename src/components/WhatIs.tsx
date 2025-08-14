import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import WebManagePic from '../assets/web_9_model_changes.png';

const Section = styled.section`
  padding: 0rem 2rem;
  padding-bottom: 2rem;
  background: transparent;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.2rem;
  span {
    background: linear-gradient(135deg, #0f8bfd, #00d4ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #cccccc;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  color: #ffffff;
`;

const MainDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #cccccc;
`;

const HighlightedText = styled.span`
  color: #0f8bfd;
  font-weight: 600;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  color: #ffffff;
  
  &:before {
    content: "✓";
    color: #0f8bfd;
    font-weight: bold;
    margin-right: 0.75rem;
    margin-bottom: 0;
    margin-top: 0;
    font-size: 1.2rem;
  }
`;

const VisualContent = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GlassCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 28px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  width: 100%;
  max-width: 600px;
`;

const IconPlaceholder = styled.div`
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  cursor: zoom-in;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    transition: transform 0.35s ease;
    transform-origin: center;
    will-change: transform;
  }
  &:hover img {
    transform: scale(2);
  }
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, #e9f4ff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:after {
    content: "";
    display: block;
    height: 3px;
    width: 100px;
    margin: 0.5rem auto 0;
    background: linear-gradient(135deg, #0f8bfd, #00d4ff);
    border-radius: 999px;
    opacity: 0.9;
  }
`;

const CardDescription = styled.p`
  color: #cccccc;
  text-align: left;
  line-height: 1.6;
`;

const WhatIs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [transformOrigin, setTransformOrigin] = useState<string>('center');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setTransformOrigin('center');
  };

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap } = await import('gsap');
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current.querySelector('h2'), 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        gsap.fromTo(sectionRef.current.querySelector('.content-grid'), 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            delay: 0.3, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    };

    initAnimation();
  }, []);

  return (
    <Section id="what-is" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            What is <span>CONBENT</span>
          </SectionTitle>
          <SectionSubtitle>
            Smart Change Management for BIM Projects
          </SectionSubtitle>
        </SectionHeader>

        <ContentGrid className="content-grid">
          <TextContent>
            <MainDescription>
              Conbent is a professional tool designed for architects, engineers, BIM managers, and contractors who need a <HighlightedText>faster, cheaper, and fully controlled</HighlightedText> solution for project change management.
            </MainDescription>
            <MainDescription>
              By automating routine checks, it reduces manual work for coordinators and managers, saving hours of time while improving accuracy and project transparency with no cloud dependency required.
            </MainDescription>
            
            <BenefitsList>
              <BenefitItem>Automated routine checks and validations</BenefitItem>
              <BenefitItem>Reduced manual coordination work</BenefitItem>
              <BenefitItem>Improved project accuracy and transparency</BenefitItem>
              <BenefitItem>No cloud dependency required</BenefitItem>
              <BenefitItem>Local-first approach for data security</BenefitItem>
            </BenefitsList>
          </TextContent>

          <VisualContent>
            <GlassCard>
            <CardTitle>BIM Model Analytics</CardTitle>
              <IconPlaceholder onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <img src={WebManagePic} alt="Web Manage" style={{ transformOrigin }} />
              </IconPlaceholder>
              <CardDescription>
                Streamline your workflow with intelligent automation and local-first architecture. 
                Take control of your project changes without compromising on security or performance.
              </CardDescription>
            </GlassCard>
          </VisualContent>
        </ContentGrid>
      </Container>
    </Section>
  );
};

export default WhatIs;
