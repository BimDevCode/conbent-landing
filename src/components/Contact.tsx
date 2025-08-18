import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const Section = styled.section`
  padding: 2rem 2rem;
  background: transparent;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 800px;
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

const ContactForm = styled.form`
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 28px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #ffffff;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(31, 32, 32, 0.8);
  border: 1px solid rgba(15, 139, 253, 0.3);
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0f8bfd;
    box-shadow: 0 0 0 3px rgba(15, 139, 253, 0.1);
  }

  &::placeholder {
    color: #888888;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(31, 32, 32, 0.8);
  border: 1px solid rgba(15, 139, 253, 0.3);
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #0f8bfd;
    box-shadow: 0 0 0 3px rgba(15, 139, 253, 0.1);
  }

  &::placeholder {
    color: #888888;
  }
`;

const SubmitButton = styled.button<{ isLoading: boolean }>`
  width: 100%;
  background: linear-gradient(135deg, #0f8bfd, #00d4ff);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(15, 139, 253, 0.4);
  opacity: ${props => props.isLoading ? 0.7 : 1};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(15, 139, 253, 0.6);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  text-align: center;
  background: ${props => props.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  border: 1px solid ${props => props.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
  color: ${props => props.type === 'success' ? '#22c55e' : '#ef4444'};
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
        
        gsap.fromTo(sectionRef.current.querySelector('form'), 
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await emailjs.send(
        'service_ypxvv7b', // Replace with your EmailJS service ID
        'template_4cx8cxj', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'nikolaysobolewskij@gmail.com' // Replace with your email
        },
        'lTlc9fl8Mkx58mz8V' // Replace with your EmailJS public key
      );

      if (result.status === 200) {
        setMessage({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="contact" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            Get in <span>Touch</span>
          </SectionTitle>
          <SectionSubtitle>
            See how Conbent can transform your workflow
          </SectionSubtitle>
        </SectionHeader>

        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@company.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message *</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your BIM project needs and how we can help..."
              required
            />
          </FormGroup>

          <SubmitButton type="submit" isLoading={isLoading} disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                Sending...
              </>
            ) : (
              'Book a Free Demo'
            )}
          </SubmitButton>

          {message && (
            <Message type={message.type}>
              {message.text}
            </Message>
          )}
        </ContactForm>
      </Container>
    </Section>
  );
};

export default Contact;
