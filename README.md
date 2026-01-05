# Heartland Notary Services Website

A professional website for a private notary service in the Midwest, built with React and Vite.

## Features

### Public Pages
- **Home**: Professional landing page with midwest branding, services overview, testimonials
- **Services**: Detailed service offerings with pricing information
- **Calculator**: Interactive price calculator for customers to estimate service costs
- **Contact**: Multiple contact options (phone, text, email) with contact form
- **Payment**: Secure credit card payment via Stripe integration

### Staff Portal
- **Quick Quote Calculator**: Staff can quickly calculate service charges
- **SMS Notifications**: Send text messages to clients via Twilio integration
  - Pre-built templates for appointment reminders, payment reminders, document ready notices
  - Custom message support
- **Recent Activity**: View recent payments, appointments, and messages

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom midwest color theme
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Payments**: Stripe.js with React Stripe Elements
- **SMS**: Twilio integration (requires backend setup)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Configuration

### Stripe Integration
Replace the test publishable key in `src/pages/Payment.jsx` with your actual Stripe publishable key:
```javascript
const stripePromise = loadStripe('pk_live_your_actual_key');
```

### Twilio Integration
The SMS functionality in the Staff Portal is designed to work with Twilio. To enable:
1. Set up a Twilio account (free tier available with $15 credit)
2. Create a backend API endpoint to handle SMS sending
3. Update the `handleSendSms` function in `src/pages/Staff.jsx` to call your API

Example Twilio backend (Node.js):
```javascript
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

app.post('/api/send-sms', async (req, res) => {
  const { to, message } = req.body;
  await client.messages.create({
    body: message,
    from: '+1YOURTWILIONUMBER',
    to: to
  });
  res.json({ success: true });
});
```

### Contact Information
Update the phone numbers and email addresses in:
- `src/components/Footer.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Home.jsx`

## Service Areas
Currently configured for:
- Iowa
- Nebraska
- Kansas
- Missouri
- Illinois

## Pricing Structure
Base rates configured in the calculator:
- General Notarization: $15 per signature
- Real Estate Closing: $150 base
- Healthcare Documents: $25 base
- Legal Documents: $20 base
- Apostille Services: $75 base

Additional fees:
- Mobile Service: $25 base (first 10 miles)
- Extended Travel: $2 per mile (after 10 miles)
- Rush Service: +50%
- Weekend: +$25
- Evening (after 6pm): +$15

## License
Private - All rights reserved
