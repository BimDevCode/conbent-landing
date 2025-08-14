import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import desktopLoginImg from '../assets/desktop_1_login.png';
import desktopSnapshotsImg from '../assets/desktop_2_snapshots.png';
import desktopElementsImg from '../assets/desktop_3_elements.png';
import desktopFamilyImg from '../assets/desktop_4_family.png';

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
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  color: #ffffff;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  color: #ffffff;
  
  &:before {
    content: "○";
    color: #0f8bfd;
    font-weight: bold;
    margin-right: 1rem;
    font-size: 1.2rem;
    margin-top: -0.2rem;
    margin-bottom: 0;
    flex-shrink: 0;
  }
`;

const FeatureTitle = styled.strong`
  color: #0f8bfd;
  display: block;
  margin-bottom: 0rem;
`;

const FeatureDescription = styled.span`
  color: #cccccc;
  line-height: 1.6;
`;

const CarouselContainer = styled.div`
  position: relative;
  height: 28rem;
  width: 40rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 24px;
  padding: 0.5rem;
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
`;

const StyledSwiper = styled(Swiper)`
  height: 100%;
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
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

const PlaceholderText = styled.div`
  font-size: 1.1rem;
  opacity: 0.8;
`;

const SlideImage = styled.img`
  width: 108%;
  height: 108%;
  padding: -3rem;
  object-fit: contain;
  border-radius: 12px;
  transition: transform 0.35s ease;
  will-change: transform;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  cursor: zoom-in;

  &:hover img {
    transform: scale(2);
  }
`;

const DesktopCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgTransformOrigin, setImgTransformOrigin] = useState<string>('center');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setImgTransformOrigin(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setImgTransformOrigin('center');
  };

  type Slide = ({ text: string } & { image: string });

  const carouselSlides: Slide[] = [
    {
      image: desktopLoginImg,
      text: 'Supports existing authentication systems'
    },
    {
      image: desktopSnapshotsImg,
      text: 'Store snapshots locally, sync when online'
    },
    {
      image: desktopElementsImg,
      text: 'Monitor each elements changes history and responsible users'
    },
    {
      image: desktopFamilyImg,
      text: 'Store components library locally, coordinate content in company in web'
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
    <Section id="desktop" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            Engineer <span>Desktop Solution</span>
          </SectionTitle>
          <SectionSubtitle>
            Work Securely, Even Offline
          </SectionSubtitle>
        </SectionHeader>

        <ContentGrid className="content-grid">
          <TextContent>
            <FeatureList>
              <FeatureItem>
                <div>
                  <FeatureTitle>Local Installation</FeatureTitle>
                  <FeatureDescription>
                    Runs directly on each workstation, ensuring maximum data security.
                  </FeatureDescription>
                </div>
              </FeatureItem>
              <FeatureItem>
                <div>
                  <FeatureTitle>Automatic Change Detection</FeatureTitle>
                  <FeatureDescription>
                    Scans project folders and family libraries for updates without interrupting your workflow.
                  </FeatureDescription>
                </div>
              </FeatureItem>
              <FeatureItem>
                <div>
                  <FeatureTitle>Seamless Integration</FeatureTitle>
                  <FeatureDescription>
                    Supports your existing user authentication system.
                  </FeatureDescription>
                </div>
              </FeatureItem>
              <FeatureItem>
                <div>
                  <FeatureTitle>Offline Mode</FeatureTitle>
                  <FeatureDescription>
                    Store snapshots locally and send them when internet access is restored.
                  </FeatureDescription>
                </div>
              </FeatureItem>
              <FeatureItem>
                <div>
                  <FeatureTitle>Duplicate Protection</FeatureTitle>
                  <FeatureDescription>
                    The system only accepts unique snapshots.
                  </FeatureDescription>
                </div>
              </FeatureItem>
            </FeatureList>

          
          </TextContent>

          <CarouselContainer>
            <StyledSwiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {carouselSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <PlaceholderSlide>
                    <ImageWrapper onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                      <SlideImage src={slide.image} alt="Desktop slide" style={{ transformOrigin: imgTransformOrigin }} />
                    </ImageWrapper>
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

export default DesktopCarousel;
