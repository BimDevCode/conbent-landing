# CONBENT Landing Page

A modern, responsive landing page for CONBENT - a BIM project analysis software. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

- **Modern Design**: Corporate dark mode with glassmorphism UI
- **Responsive Layout**: Mobile-first design with tablet and desktop support
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Interactive Components**: Swiper.js carousels and smooth scrolling navigation
- **Contact Form**: EmailJS integration for serverless form handling
- **Performance Optimized**: Lazy-loaded animations and optimized rendering

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Styled Components** for scoped styling
- **GSAP** for advanced animations
- **Swiper.js** for carousel components
- **EmailJS** for contact form functionality
- **React Router** for smooth scrolling navigation
- **Vite** for fast development and building

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd conbent-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### EmailJS Setup

The contact form uses EmailJS for serverless email functionality. You'll need to:

1. **Create an EmailJS account** at [emailjs.com](https://www.emailjs.com/)
2. **Set up an email service** (Gmail, Outlook, etc.)
3. **Create an email template**
4. **Update the configuration** in `src/components/Contact.tsx`:

```typescript
const result = await emailjs.send(
  'YOUR_SERVICE_ID',        // Replace with your service ID
  'YOUR_TEMPLATE_ID',       // Replace with your template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'your-email@example.com' // Replace with your email
  },
  'YOUR_PUBLIC_KEY'         // Replace with your public key
);
```

### Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CONTACT_EMAIL=your-email@example.com
```

Then update the Contact component to use these variables.

## 🎨 Customization

### Colors

The color scheme is defined in the styled components. Main colors:

- **Background**: `#282828`
- **Primary**: `#0f8bfd`
- **Dark Ground**: `#1f2020`
- **Light Cards**: `#333333`

### Typography

Font sizes use CSS `clamp()` for responsive typography:

```css
font-size: clamp(2rem, 4vw, 3rem);
```

### Animations

GSAP animations are configured with ScrollTrigger for scroll-based animations. Customize timing and effects in each component's `useEffect` hook.

## 📱 Responsive Design

The landing page is built with a mobile-first approach:

- **Mobile**: Single column layouts, optimized touch targets
- **Tablet**: Adaptive grid layouts
- **Desktop**: Full multi-column layouts with enhanced animations

## 🚀 Deployment

### GitHub Pages

The project includes GitHub Pages deployment configuration:

```bash
npm run deploy
```

### Other Platforms

Build the project and deploy the `dist` folder to any static hosting service:

- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── WhatIs.tsx       # What is CONBENT section
│   ├── Why.tsx          # Why CONBENT section
│   ├── Features.tsx     # Key features grid
│   ├── DesktopCarousel.tsx # Engineer desktop solution
│   ├── OnlineCarousel.tsx  # Online management
│   ├── Visualization.tsx   # 3D visualization
│   └── Contact.tsx      # Contact form
├── App.tsx              # Main app component
├── App.css              # Global styles
└── main.tsx             # App entry point
```

## 🎯 Key Sections

1. **Hero**: Main headline and CTA
2. **What is CONBENT**: Product description
3. **Why CONBENT**: Benefits and advantages
4. **Features**: Key product features
5. **Desktop Solution**: Engineer workstation features
6. **Online Management**: Web application features
7. **3D Visualization**: Project visualization capabilities
8. **Contact**: Demo request form

## 🔍 Performance Optimization

- **Lazy Loading**: GSAP and other heavy libraries are imported dynamically
- **Optimized Images**: Placeholder content with shimmer effects
- **CSS-in-JS**: Scoped styling prevents CSS conflicts
- **Responsive Images**: Optimized for different screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **GSAP not working**: Ensure ScrollTrigger plugin is registered
2. **Swiper not working**: Check that CSS files are imported
3. **EmailJS errors**: Verify service ID, template ID, and public key
4. **Styling issues**: Check for styled-components conflicts

### Development Tips

- Use browser dev tools to inspect styled components
- Check console for GSAP/ScrollTrigger warnings
- Test responsive design with browser dev tools
- Verify EmailJS configuration in browser network tab

## 📄 License

This project is proprietary software for CONBENT. All rights reserved.

## 🤝 Contributing

For internal development:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For technical support or questions about the landing page, contact the development team.

---

**Built with ❤️ for CONBENT**
