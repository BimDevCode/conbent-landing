import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import MonitorImg from '../assets/monitor.png';
import LibraryImg from '../assets/bookshelf.png';
import VersionImg from '../assets/merge.png';
import AuditImg from '../assets/search.png';

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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 24px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  will-change: transform;

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover .border-rect {
    stroke-dashoffset: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
`;

const BorderSvg = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  height: 100%;
  width: 100%;

  .border-rect {
    fill: none;
    stroke: rgba(15, 139, 253, 0.9);
    stroke-width: 2px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    transition: stroke-dashoffset 0.9s ease;
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  transition: transform 0.3s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.4) ;
  }
`;

const FeatureTitle = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: MonitorImg,
      title: 'Real-time Model Monitoring',
      description: 'Continuous monitoring of your BIM models with instant change detection and notifications.'
    },
    {
      icon: LibraryImg,
      title: 'Metadata-driven Library',
      description: 'Organized content library with powerful metadata management and search capabilities.'
    },
    {
      icon: VersionImg,
      title: 'Full Revit Versioning',
      description: 'Complete version control and history tracking for all your Revit projects.'
    },
    {
      icon: AuditImg,
      title: 'Audit',
      description: 'Detailed insights into project performance and team productivity metrics.'
    }
  ];

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
        
        const featureCards = sectionRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(featureCards, 
          { opacity: 0, y: 50, stagger: 0.1 },
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
    <Section id="features" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            Key <span>Features</span>
          </SectionTitle>
          <SectionSubtitle>
            Powerful tools designed to transform your BIM workflow
          </SectionSubtitle>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} className="feature-card">
              <BorderSvg>
                <rect className="border-rect" pathLength="100" x="0" y="0" width="100%" height="100%" rx="24" />
              </BorderSvg>
              <FeatureIcon>
                <img src={feature.icon} alt={feature.title} width={30} height={30} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        
      </Container>
    </Section>
  );
};

export default Features;
