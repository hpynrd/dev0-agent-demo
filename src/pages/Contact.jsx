import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'general',
    message: '',
    preferredContact: 'phone',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const staffMembers = [
    { name: 'Sarah Johnson', role: 'Senior Notary', phone: '(555) 123-4567', available: true },
    { name: 'Michael Chen', role: 'Mobile Notary', phone: '(555) 123-4568', available: true },
    { name: 'Emily Rodriguez', role: 'Real Estate Specialist', phone: '(555) 123-4569', available: false },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-midwest-navy mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 1 business hour.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                service: 'general',
                message: '',
                preferredContact: 'phone',
              });
            }}
            className="bg-midwest-gold text-midwest-navy px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-midwest-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-midwest-wheat max-w-2xl mx-auto">
            Reach out by phone, text, or email. We're here to help!
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href="tel:+15551234567"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex items-center space-x-4"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-midwest-navy">Call Us</h3>
                <p className="text-lg text-gray-700">(555) 123-4567</p>
                <p className="text-sm text-gray-500">Available 8am-6pm</p>
              </div>
            </a>

            <a
              href="sms:+15551234567?body=Hi, I need notary services."
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex items-center space-x-4"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-midwest-navy">Text Us</h3>
                <p className="text-lg text-gray-700">(555) 123-4567</p>
                <p className="text-sm text-gray-500">Quick responses</p>
              </div>
            </a>

            <a
              href="mailto:info@heartlandnotary.com"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex items-center space-x-4"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-midwest-navy">Email Us</h3>
                <p className="text-lg text-gray-700">info@heartlandnotary.com</p>
                <p className="text-sm text-gray-500">24hr response</p>
              </div>
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-midwest-navy mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
                    >
                      <option value="general">General Notarization</option>
                      <option value="realEstate">Real Estate Closing</option>
                      <option value="mobile">Mobile Notary Service</option>
                      <option value="healthcare">Healthcare Documents</option>
                      <option value="legal">Legal Documents</option>
                      <option value="apostille">Apostille Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex space-x-4">
                      {['phone', 'text', 'email'].map((method) => (
                        <label key={method} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method}
                            checked={formData.preferredContact === method}
                            onChange={handleChange}
                            className="w-4 h-4 text-midwest-gold focus:ring-midwest-gold"
                          />
                          <span className="capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
                      placeholder="Tell us about your notary needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-midwest-gold text-midwest-navy py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Office Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-midwest-navy mb-4">Office Location</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-midwest-gold mt-1" />
                    <div>
                      <p className="font-medium">Heartland Notary Services</p>
                      <p className="text-gray-600">123 Main Street</p>
                      <p className="text-gray-600">Des Moines, IA 50309</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-midwest-gold mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Mon-Fri: 8am - 6pm</p>
                      <p className="text-gray-600">Sat: 9am - 2pm</p>
                      <p className="text-gray-600">Sun: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Staff Directory */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-midwest-navy mb-4">Our Team</h3>
                <div className="space-y-4">
                  {staffMembers.map((staff) => (
                    <div key={staff.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.role}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${staff.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        <a
                          href={`tel:${staff.phone.replace(/\D/g, '')}`}
                          className="text-sm text-midwest-navy hover:text-midwest-gold"
                        >
                          {staff.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Services</h3>
                <p className="text-sm text-red-700 mb-4">
                  Need urgent notary services outside business hours?
                </p>
                <a
                  href="tel:+15559876543"
                  className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Emergency Line: (555) 987-6543
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
