import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import WebAuditImg from '../assets/web_10_audits.png';
import WebAuditSetupImg from '../assets/web_12_audits_setup.png';
import WebAuditHistoryImg from '../assets/web_11_audits_history.png';

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
  margin-bottom: 0rem;
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
  margin-bottom: 0;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  margin-top: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  color: #ffffff;
`;



const AuditRulesInfo = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 22px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const AuditRulesTitle = styled.h4`
  color: #0f8bfd;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const AuditRulesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AuditRule = styled.li`
  color: #cccccc;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  
  &:before {
    content: "•";
    color: #0f8bfd;
    margin-right: 0.5rem;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 36rem;
  height: 28rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const StyledSwiper = styled(Swiper)`
  height: 100%;
  
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1b1c1e, #242628);
    color: white;
    font-size: 1.2rem;
    text-align: center;
    padding: 2rem;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #0f8bfd;
    background: rgba(51, 51, 51, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    
    &:after {
      font-size: 1.2rem;
    }
  }

  .swiper-pagination-bullet {
    background: #0f8bfd;
    opacity: 0.5;
    
    &-active {
      opacity: 1;
    }
  }
`;

const PlaceholderSlide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
`;

const PlaceholderIcon = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const PlaceholderText = styled.div`
  font-size: 1.1rem;
  opacity: 0.8;
`;

const Audit: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const carouselSlides = [
  
    {
      icon: WebAuditImg,
      text: 'Audit Tab - Create and run verification rules'
    },
    {
      icon: WebAuditSetupImg,
      text: 'Custom Audit Rules - Filter by category, name, parameters'
    },
    {
      icon: WebAuditHistoryImg,
      text: 'Automated or Manual Audits - Run automatically or on-demand'
    },
 
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
    <Section id="audit" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            <span>Audit</span>
          </SectionTitle>
          <SectionSubtitle>
            Stay Ahead of Project Risks
          </SectionSubtitle>
        </SectionHeader>

        <ContentGrid className="content-grid">
          <TextContent>
            <AuditRulesInfo>
              <AuditRulesTitle>Audit</AuditRulesTitle>
              <AuditRulesList>
                <AuditRule>Review all sync snapshots, including lists of changed and new elements.</AuditRule>
                <AuditRule>Create, save, and run verification rules to maintain project quality.</AuditRule>
              </AuditRulesList>
            </AuditRulesInfo>

            <AuditRulesInfo>
              <AuditRulesTitle>Custom Audit Rules</AuditRulesTitle>
              <AuditRulesList>
                <AuditRule>Filter by category, name, parameters, or object type (instances, families, or both)</AuditRule>
                <AuditRule>Check parameter presence or values, compare parameters, count copies</AuditRule>
                <AuditRule>Validate against your family library</AuditRule>
              </AuditRulesList>
            </AuditRulesInfo>

            <AuditRulesInfo>
              <AuditRulesTitle>Automated or Manual Audits</AuditRulesTitle>
              <AuditRulesList>
                <AuditRule>Run audits automatically upon receiving new snapshots or launch them manually</AuditRule>
                <AuditRule>View pass/fail statistics and drill down to specific elements in Revit</AuditRule>
              </AuditRulesList>
            </AuditRulesInfo>
          </TextContent>

          <CarouselContainer>
            <StyledSwiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {carouselSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <PlaceholderSlide>
                    <PlaceholderIcon><img src={slide.icon} alt="Audit" /></PlaceholderIcon>
                    <PlaceholderText>{slide.text}</PlaceholderText>
                  </PlaceholderSlide>
                </SwiperSlide>
              ))}
            </StyledSwiper>
          </CarouselContainer>
        </ContentGrid>
      </Container>
    </Section>
  );
};

export default Audit;


