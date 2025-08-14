# EmailJS Setup Guide for CONBENT Landing Page

This guide will help you set up EmailJS to enable the contact form functionality on your CONBENT landing page.

## 🚀 Quick Setup

### 1. Create EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Set Up Email Service

1. **Log in** to your EmailJS dashboard
2. Go to **Email Services** tab
3. Click **"Add New Service"**
4. Choose your email provider:
   - **Gmail**: Use your Gmail account
   - **Outlook**: Use your Outlook/Hotmail account
   - **Custom SMTP**: For business email servers
5. **Authorize** the service with your email provider
6. **Note down the Service ID** (you'll need this later)

### 3. Create Email Template

1. Go to **Email Templates** tab
2. Click **"Create New Template"**
3. **Template Name**: `CONBENT Contact Form`
4. **Subject**: `New Demo Request from {{from_name}}`
5. **Content** (HTML):

```html
<!DOCTYPE html>
<html>
<head>
    <title>New Demo Request</title>
</head>
<body>
    <h2>New Demo Request from CONBENT Landing Page</h2>
    
    <h3>Contact Information:</h3>
    <p><strong>Name:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    
    <h3>Message:</h3>
    <p>{{message}}</p>
    
    <hr>
    <p><em>This message was sent from the CONBENT landing page contact form.</em></p>
</body>
</html>
```

6. **Save** the template
7. **Note down the Template ID** (you'll need this later)

### 4. Get Your Public Key

1. Go to **Account** tab
2. Copy your **Public Key**

## 🔧 Update Your Code

### Option 1: Direct Configuration (Quick)

Update the Contact component in `src/components/Contact.tsx`:

```typescript
// Replace these values with your actual IDs
const result = await emailjs.send(
  'service_abc123',           // Your Service ID
  'template_xyz789',          // Your Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'your-email@example.com'
  },
  'public_key_here'           // Your Public Key
);
```

### Option 2: Environment Variables (Recommended)

1. **Create `.env` file** in your project root:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=public_key_here
VITE_CONTACT_EMAIL=your-email@example.com
```

2. **Update Contact component** to use environment variables:

```typescript
const result = await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: import.meta.env.VITE_CONTACT_EMAIL
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

## 🧪 Testing

### 1. Test in Development

1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Submit the form
4. Check your email for the test message
5. Check browser console for any errors

### 2. Test in Production

1. Build your project: `npm run build`
2. Deploy to your hosting platform
3. Test the live contact form
4. Verify emails are received

## 🔒 Security Considerations

### 1. Rate Limiting

EmailJS has built-in rate limiting:
- **Free Plan**: 200 emails/month
- **Paid Plans**: Higher limits available

### 2. Spam Protection

- EmailJS includes basic spam protection
- Consider adding CAPTCHA for additional security
- Monitor your email service for unusual activity

### 3. Data Privacy

- Contact form data is processed by EmailJS
- Review EmailJS privacy policy
- Consider GDPR compliance if serving EU users

## 🐛 Troubleshooting

### Common Issues

1. **"Service not found" error**
   - Verify your Service ID is correct
   - Ensure the service is properly configured

2. **"Template not found" error**
   - Verify your Template ID is correct
   - Check that the template is published

3. **"Public key invalid" error**
   - Verify your Public Key is correct
   - Check that your account is active

4. **Emails not received**
   - Check spam/junk folder
   - Verify email service configuration
   - Check EmailJS dashboard for delivery status

### Debug Steps

1. **Check browser console** for JavaScript errors
2. **Verify network requests** in browser dev tools
3. **Check EmailJS dashboard** for delivery logs
4. **Test with simple template** first

## 📱 Advanced Configuration

### Custom Email Templates

You can create more sophisticated templates:

```html
<!-- Professional Business Template -->
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { background: #0f8bfd; color: white; padding: 20px; }
        .content { padding: 20px; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>CONBENT Demo Request</h1>
    </div>
    <div class="content">
        <h3>New inquiry from {{from_name}}</h3>
        <p><strong>Email:</strong> {{from_email}}</p>
        <p><strong>Message:</strong></p>
        <p>{{message}}</p>
    </div>
    <div class="footer">
        <p>Sent from CONBENT Landing Page</p>
    </div>
</body>
</html>
```

### Multiple Recipients

To send to multiple email addresses:

```typescript
const result = await emailjs.send(
  serviceId,
  templateId,
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'team@conbent.com, sales@conbent.com'
  },
  publicKey
);
```

## 💰 Pricing

EmailJS offers several plans:

- **Free**: 200 emails/month
- **Basic**: $15/month - 1,000 emails
- **Pro**: $25/month - 10,000 emails
- **Business**: $50/month - 50,000 emails

For business use, consider the Pro or Business plan for higher limits and priority support.

## 📞 Support

- **EmailJS Documentation**: [docs.emailjs.com](https://docs.emailjs.com/)
- **EmailJS Support**: Available on paid plans
- **Community Forum**: [community.emailjs.com](https://community.emailjs.com/)

---

**Need help?** Contact the development team or refer to the EmailJS documentation for advanced features.
