import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem 2rem;
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
  margin-bottom: 3rem;
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
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const GlassCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 28px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  overflow: hidden;
  will-change: transform;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(15, 138, 253, 0.14);
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(15, 139, 253, 0.4);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  &:hover::before {
    opacity: 1;
  }

`;

const CardIcon = styled.div`
  height: 50px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  transition: transform 0.3s ease;

  ${GlassCard}:hover & {
    transform: scale(1.2);
  }
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.6rem;
  margin-bottom: 0.75rem;
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
    width: 90px;
    margin: 0.5rem auto 0;
    background: linear-gradient(135deg, #0f8bfd, #00d4ff);
    border-radius: 999px;
    opacity: 0.9;
  }
`;

const CardDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
  text-align: left;
  margin-bottom: 1rem;
`;

const CardFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const CardFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  color: #ffffff;
  font-size: 0.9rem;
  
  &:before {
    content: "•";
    color: #0f8bfd;
    font-weight: bold;
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const Why: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        
        const cards = sectionRef.current.querySelectorAll('.glass-card');
        gsap.fromTo(cards, 
          { opacity: 0, y: 50, stagger: 0.2 },
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
    <Section id="why" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            Why <span>CONBENT</span>
          </SectionTitle>
          <SectionSubtitle>
            Full Control Meets Automation. Work Securely, Even Offline
          </SectionSubtitle>
        </SectionHeader>

        <CardsGrid>
          <GlassCard className="glass-card">
            <CardIcon>💰</CardIcon>
            <CardTitle>Cheaper</CardTitle>
            <CardDescription>
              No recurring cloud storage costs. Leverage your existing local infrastructure.
            </CardDescription>
            <CardFeatures>
              <CardFeature>No monthly subscription fees</CardFeature>
              <CardFeature>Uses existing hardware</CardFeature>
              <CardFeature>One-time licensing model</CardFeature>
            </CardFeatures>
          </GlassCard>

          <GlassCard className="glass-card">
            <CardIcon>⚡</CardIcon>
            <CardTitle>Faster</CardTitle>
            <CardDescription>
              Data processing and scanning happen locally, eliminating network latency.
            </CardDescription>
            <CardFeatures>
              <CardFeature>Local data processing</CardFeature>
              <CardFeature>Instant model scanning</CardFeature>
              <CardFeature>No upload/download delays</CardFeature>
            </CardFeatures>
          </GlassCard>

          <GlassCard className="glass-card">
            <CardIcon>🔒</CardIcon>
            <CardTitle>Secure</CardTitle>
            <CardDescription>
              Sensitive project data never leaves your network, ensuring maximum security.
            </CardDescription>
            <CardFeatures>
              <CardFeature>Data stays on-premises</CardFeature>
              <CardFeature>Network isolation</CardFeature>
              <CardFeature>Compliance ready</CardFeature>
            </CardFeatures>
          </GlassCard>
        </CardsGrid>

        <SectionSubtitle style={{ marginTop: '3rem', textAlign: 'center' }}>
          <strong>What You Get</strong> Automatic updates tracking for BIM projects, Centralized Revit family management, 
          model integrity enforcement, and standards compliance across your team.
        </SectionSubtitle>
      </Container>
    </Section>
  );
};

export default Why;
