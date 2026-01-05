import { Link } from 'react-router-dom';
import { FileText, Shield, Clock, MapPin, Star, CheckCircle } from 'lucide-react';

export default function Home() {
  const services = [
    { icon: FileText, title: 'Document Notarization', desc: 'Legal documents, affidavits, and sworn statements' },
    { icon: Shield, title: 'Real Estate Closings', desc: 'Mortgage documents and property transfers' },
    { icon: Clock, title: 'Mobile Services', desc: 'We come to you - home, office, or hospital' },
    { icon: MapPin, title: 'Multi-State Coverage', desc: 'Serving Iowa, Nebraska, Kansas, Missouri & Illinois' },
  ];

  const testimonials = [
    { name: 'Sarah M.', location: 'Des Moines, IA', text: 'Fast, professional service. They came to my office and handled everything efficiently.' },
    { name: 'John D.', location: 'Omaha, NE', text: 'Used them for our home closing. Excellent communication and very thorough.' },
    { name: 'Maria L.', location: 'Kansas City, MO', text: 'The online payment option made everything so convenient. Highly recommend!' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-midwest-navy via-midwest-navy to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-midwest-gold">Heartland</span> Notary Services
            </h1>
            <p className="text-xl md:text-2xl text-midwest-wheat mb-8 max-w-3xl mx-auto">
              Professional notary services across the Midwest. Fast, reliable, and convenient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-midwest-gold text-midwest-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Schedule Appointment
              </Link>
              <Link
                to="/calculator"
                className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors border border-white/30"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-midwest-navy mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-midwest-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-midwest-navy" />
                </div>
                <h3 className="text-lg font-semibold text-midwest-navy mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-midwest-navy mb-6">Why Choose Heartland Notary?</h2>
              <ul className="space-y-4">
                {[
                  '25+ years of trusted service',
                  'Licensed in 5 Midwest states',
                  'Mobile services available 7 days a week',
                  'Same-day appointments available',
                  'Secure online payment options',
                  'Bilingual services (English/Spanish)',
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-midwest-forest flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-midwest-wheat to-midwest-gold/30 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-midwest-navy mb-2">10,000+</div>
                <p className="text-gray-700 mb-6">Documents Notarized</p>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-midwest-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">4.9/5 Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-midwest-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ name, location, text }) => (
              <div key={name} className="bg-white/10 backdrop-blur p-6 rounded-xl">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-midwest-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 mb-4">"{text}"</p>
                <div>
                  <p className="font-semibold text-midwest-wheat">{name}</p>
                  <p className="text-sm text-gray-400">{location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midwest-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-midwest-navy mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-800 mb-8">
            Contact us today for fast, professional notary services anywhere in the Midwest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234567"
              className="bg-midwest-navy text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors"
            >
              Call (555) 123-4567
            </a>
            <a
              href="sms:+15551234567"
              className="bg-white text-midwest-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Text Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
