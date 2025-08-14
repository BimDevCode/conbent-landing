import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import VisualizationImg from '../assets/web_13_3d.png';

const Section = styled.section`
  padding: 2rem 2rem;
  background: transparent;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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

const VisualizationContainer = styled.div`
  position: relative;
  margin-top: 3rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #1f2020, #333333);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

`;

const VisualizationIcon = styled.div`
  z-index: 2;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  img {
    height: 140%;
    width: 100%;
    object-fit: contain;
    padding: 4rem;
    margin-bottom: 12rem;
  }
`;

const VisualizationText = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 24px;
  padding: 1.5rem;
  color: #ffffff;
  z-index: 2;
`;

const VisualizationTitle = styled.h3`
  color: #0f8bfd;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const VisualizationDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
`;


const Visualization: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);


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
        
        gsap.fromTo(sectionRef.current.querySelector('p'), 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            delay: 0.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Image reveal animation
        if (imageRef.current) {
          gsap.fromTo(imageRef.current, 
            { 
              clipPath: "inset(0 100% 0 0)",
              opacity: 0 
            },
            { 
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 1.5,
              delay: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
    
      }
    };

    initAnimation();
  }, []);

  return (
    <Section id="visualization" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            3D <span>Visualization</span>
          </SectionTitle>
          <SectionSubtitle>
            See the Whole Picture
          </SectionSubtitle>
        </SectionHeader>

        <VisualizationContainer>
          <ImagePlaceholder ref={imageRef}>
            <VisualizationIcon>
              <img src={VisualizationImg} alt="Visualization" />
            </VisualizationIcon>
            <VisualizationText>
              <VisualizationTitle>Complete Project Visualization</VisualizationTitle>
              <VisualizationDescription>
                View all element instances in 3D including deleted items with change history. 
                Analyze deleted elements alongside existing ones for a complete project timeline.
              </VisualizationDescription>
            </VisualizationText>
          </ImagePlaceholder>
        </VisualizationContainer>

      </Container>
    </Section>
  );
};

export default Visualization;
