import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import WebLoginImg from '../assets/web_1_login.png';
import WebHomeImg from '../assets/web_2_home.png';
import WebElementsImg from '../assets/web_3_elements.png';
import WebDeletedElementsImg from '../assets/web_4_deleted_elements.png';
import WebElementDetailsImg from '../assets/web_5_element_details.png';
import WebElementHistoryImg from '../assets/web_6_element_history.png';
import WebExportImg from '../assets/web_7_elements_export.png';
import WebModelChangesImg from '../assets/web_9_model_changes.png';
import WebAuditsImg from '../assets/web_10_audits.png';
import WebAuditsHistoryImg from '../assets/web_11_audits_history.png';
import WebAuditsSetupImg from '../assets/web_12_audits_setup.png';
import Web3DImg from '../assets/web_13_3d.png';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Section = styled.section`
  padding: 2rem 2rem;
  background: transparent;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const FeatureTitle = styled.strong`
  font-size: clamp(1rem, 4vw, 1.5rem);
  color: #0f8bfd;
  display: block;
`;

const FeatureDescription = styled.span`
  color: #cccccc;
  line-height: 1.6;
`;

const CardTitle = styled.h3`
  width: 100%;
  text-align: center;
  font-size: clamp(1rem, 4vw, 1.5rem);
  font-weight: 500;
  margin: 0;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  background: linear-gradient(135deg, #e9f4ff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:after {
    content: "";
    display: block;
    height: 3px;
    width: 120px;
    max-width: 35%;
    margin: 0.5rem auto 0;
    background: linear-gradient(135deg, #0f8bfd, #00d4ff);
    border-radius: 999px;
    opacity: 0.9;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0.3rem 0 0.8rem;
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
  max-width: 760px;
  margin: 0.5rem auto 0;
  line-height: 1.6;
`;

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: start;
  margin-top: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* Removed unused Card styled component */

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 1rem;
  color: #eaeaea;

  &:before {
    content: "○";
    color: #0f8bfd;
    font-weight: 700;
    margin-top: 0.4rem;
    flex-shrink: 0;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 24px;
  padding: 0.5rem;
  padding-top: 0rem;
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
    padding-top: 0rem;
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
  height: 30rem;
  padding: -3rem;
  object-fit: cover;
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
const OnlineControll: React.FC = () => {
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
      image: WebLoginImg,
      text: 'Login to your account'
    },
    {
      image: WebHomeImg,
      text: 'Overview of the latest project updates'
    },
    {
      image: WebElementsImg,
      text: 'Browse project elements with rich filters'
    },
    {
      image: WebDeletedElementsImg,
      text: 'Quickly inspect deleted items by user and time'
    },
    {
      image: WebElementDetailsImg,
      text: 'Open element details and properties'
    },
    {
      image: WebElementHistoryImg,
      text: 'See full per-element change history'
    },
    {
      image: WebExportImg,
      text: 'Export filtered data to Excel'
    },
    {
      image: WebModelChangesImg,
      text: 'Review model changes between snapshots'
    },
    {
      image: WebAuditsImg,
      text: 'Run audits and validate project quality'
    },
    {
      image: WebAuditsHistoryImg,
      text: 'Audit history and results in one place'
    },
    {
      image: WebAuditsSetupImg,
      text: 'Configure custom audit rules'
    },
    {
      image: Web3DImg,
      text: 'Inspect 3D geometry directly in the browser'
    },
  ];
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      if (!sectionRef.current) return;
      const header = sectionRef.current.querySelector('[data-anim="head"]');
      const cols = sectionRef.current.querySelectorAll('[data-anim="col"]');
      gsap.fromTo(header, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
      gsap.fromTo(cols, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15, delay: 0.2 });
    };
    run();
  }, []);

  return (
    <Section id="online-controll" ref={sectionRef}>
      <Container>
        <SectionHeader data-anim="head">
          <SectionTitle>Coordinator<span> Web Solution</span></SectionTitle>
          <SectionSubtitle>Second Part of Conbent Solution</SectionSubtitle>
        </SectionHeader>
        <ContentGrid>
          <CarouselContainer>
          <CardTitle>Application Overview</CardTitle>
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
            <CardTitle>What you can do?</CardTitle>
            <FeatureList>
              <FeatureItem>
                <div> <FeatureTitle>Model Elements</FeatureTitle>
                <FeatureDescription>See all deleted, modified, and added elements with timestamps and responsible users.</FeatureDescription></div>
              </FeatureItem>
              <FeatureItem>
                <div>
                  <FeatureTitle>Model Changes Overview</FeatureTitle>
                  <FeatureDescription>
                    Review all sync snapshots, including lists of changed and new elements.
                  </FeatureDescription>
                </div>
              </FeatureItem>
              <FeatureItem>
                <div> <FeatureTitle>Excel Export</FeatureTitle>
                <FeatureDescription>Filter data by specific criteria and export results for reporting.</FeatureDescription></div>
              </FeatureItem>
              <FeatureItem>
                <div> <FeatureTitle>Deleted Items Filter</FeatureTitle>
                <FeatureDescription>Instantly check who and when removed elements.</FeatureDescription></div>
              </FeatureItem>
              <FeatureItem>
                <div> <FeatureTitle>Element Details</FeatureTitle>
                <FeatureDescription>View properties, 3D geometry, and even select the element in an open Revit project directly from your browser</FeatureDescription></div>
              </FeatureItem>
              <FeatureItem>
                <div> <FeatureTitle>Per ElementChange History</FeatureTitle>
                <FeatureDescription>Track every modification made to each element.</FeatureDescription></div>
              </FeatureItem>
            </FeatureList>
        </ContentGrid>
      </Container>
    </Section>
  );
};

export default OnlineControll;


