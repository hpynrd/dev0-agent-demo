import { Link } from 'react-router-dom';
import { FileText, Home, Car, Briefcase, Heart, Scale, Globe, Clock } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: FileText,
      title: 'General Notarization',
      price: '$15',
      description: 'Standard notarization for affidavits, acknowledgments, jurats, and other legal documents.',
      includes: ['Per signature/seal', 'Document verification', 'Official notary seal', 'Record keeping'],
    },
    {
      icon: Home,
      title: 'Real Estate Closings',
      price: '$150+',
      description: 'Complete loan signing services for mortgage refinancing, purchases, and home equity loans.',
      includes: ['Full document package', 'Borrower education', 'Document shipping', 'Error-free guarantee'],
    },
    {
      icon: Car,
      title: 'Mobile Notary Services',
      price: '$50+',
      description: 'We come to your location - home, office, hospital, or anywhere convenient for you.',
      includes: ['Travel within 25 miles', 'Flexible scheduling', 'Evening/weekend available', 'Same-day service'],
    },
    {
      icon: Briefcase,
      title: 'Business Services',
      price: 'Custom',
      description: 'Corporate document notarization, contracts, and ongoing business partnerships.',
      includes: ['Volume discounts', 'Priority scheduling', 'Dedicated notary', 'Monthly billing'],
    },
    {
      icon: Heart,
      title: 'Healthcare Documents',
      price: '$25',
      description: 'Power of attorney, living wills, healthcare directives, and medical authorizations.',
      includes: ['HIPAA compliant', 'Hospital visits', 'Witness services', 'Sensitive handling'],
    },
    {
      icon: Scale,
      title: 'Legal Documents',
      price: '$20',
      description: 'Court documents, depositions, and attorney-prepared legal instruments.',
      includes: ['Attorney coordination', 'Rush service available', 'Certified copies', 'Court filing assistance'],
    },
    {
      icon: Globe,
      title: 'Apostille Services',
      price: '$75+',
      description: 'Document authentication for international use, including apostille coordination.',
      includes: ['State coordination', 'Document preparation', 'Shipping included', 'Tracking provided'],
    },
    {
      icon: Clock,
      title: 'Emergency Services',
      price: '$100+',
      description: '24/7 emergency notary services for urgent situations.',
      includes: ['Available 24/7', 'Immediate response', 'Any location', 'Holiday availability'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-midwest-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-midwest-wheat max-w-2xl mx-auto">
            Comprehensive notary services for individuals and businesses across the Midwest
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, price, description, includes }) => (
              <div key={title} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                <div className="bg-gradient-to-r from-midwest-navy to-blue-800 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-midwest-gold rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-midwest-navy" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{title}</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-midwest-gold">{price}</span>
                    {price !== 'Custom' && <span className="text-gray-300 ml-1">starting</span>}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{description}</p>
                  <ul className="space-y-2">
                    {includes.map((item) => (
                      <li key={item} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-midwest-gold rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-12 bg-midwest-wheat/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-midwest-navy mb-4">Transparent Pricing</h2>
          <p className="text-gray-700 mb-6">
            Our prices are competitive and transparent. Use our calculator for an instant estimate, 
            or contact us for a custom quote for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/calculator"
              className="bg-midwest-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Use Price Calculator
            </Link>
            <Link
              to="/contact"
              className="bg-midwest-gold text-midwest-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-midwest-navy mb-12">Service Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {['Iowa', 'Nebraska', 'Kansas', 'Missouri', 'Illinois'].map((state) => (
              <div key={state} className="bg-gray-50 p-6 rounded-xl">
                <div className="text-4xl mb-2">🌾</div>
                <h3 className="font-semibold text-midwest-navy">{state}</h3>
                <p className="text-sm text-gray-600">Full Coverage</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
