import { useState } from 'react';
import { Calculator as CalcIcon, Plus, Minus, DollarSign, FileText, Car, Clock } from 'lucide-react';

export default function Calculator() {
  const [serviceType, setServiceType] = useState('general');
  const [signatures, setSignatures] = useState(1);
  const [travelMiles, setTravelMiles] = useState(0);
  const [isRush, setIsRush] = useState(false);
  const [isWeekend, setIsWeekend] = useState(false);
  const [isEvening, setIsEvening] = useState(false);
  const [documentCount, setDocumentCount] = useState(1);

  const pricing = {
    general: { base: 15, perSignature: 15, name: 'General Notarization' },
    realEstate: { base: 150, perSignature: 0, name: 'Real Estate Closing' },
    healthcare: { base: 25, perSignature: 10, name: 'Healthcare Documents' },
    legal: { base: 20, perSignature: 15, name: 'Legal Documents' },
    apostille: { base: 75, perSignature: 25, name: 'Apostille Services' },
  };

  const calculateTotal = () => {
    const service = pricing[serviceType];
    let total = service.base;
    
    // Add per-signature cost
    if (service.perSignature > 0) {
      total += (signatures - 1) * service.perSignature;
    }
    
    // Add document count for real estate
    if (serviceType === 'realEstate' && documentCount > 1) {
      total += (documentCount - 1) * 25;
    }
    
    // Travel fee ($2 per mile after first 10 miles)
    if (travelMiles > 10) {
      total += (travelMiles - 10) * 2;
    } else if (travelMiles > 0) {
      total += 25; // Base mobile fee
    }
    
    // Rush service (+50%)
    if (isRush) {
      total *= 1.5;
    }
    
    // Weekend surcharge (+$25)
    if (isWeekend) {
      total += 25;
    }
    
    // Evening surcharge (+$15)
    if (isEvening) {
      total += 15;
    }
    
    return total.toFixed(2);
  };

  const breakdown = () => {
    const items = [];
    const service = pricing[serviceType];
    
    items.push({ label: `${service.name} (Base)`, amount: service.base });
    
    if (service.perSignature > 0 && signatures > 1) {
      items.push({ 
        label: `Additional Signatures (${signatures - 1} × $${service.perSignature})`, 
        amount: (signatures - 1) * service.perSignature 
      });
    }
    
    if (serviceType === 'realEstate' && documentCount > 1) {
      items.push({ 
        label: `Additional Documents (${documentCount - 1} × $25)`, 
        amount: (documentCount - 1) * 25 
      });
    }
    
    if (travelMiles > 0) {
      if (travelMiles > 10) {
        items.push({ label: 'Mobile Service Base', amount: 25 });
        items.push({ 
          label: `Extended Travel (${travelMiles - 10} miles × $2)`, 
          amount: (travelMiles - 10) * 2 
        });
      } else {
        items.push({ label: 'Mobile Service Fee', amount: 25 });
      }
    }
    
    if (isWeekend) {
      items.push({ label: 'Weekend Surcharge', amount: 25 });
    }
    
    if (isEvening) {
      items.push({ label: 'Evening Surcharge', amount: 15 });
    }
    
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    
    if (isRush) {
      items.push({ label: 'Rush Service (+50%)', amount: subtotal * 0.5 });
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-midwest-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-midwest-gold rounded-full flex items-center justify-center">
              <CalcIcon className="w-8 h-8 text-midwest-navy" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Service Calculator</h1>
          <p className="text-xl text-midwest-wheat max-w-2xl mx-auto">
            Get an instant estimate for your notary service needs
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-midwest-navy mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Service Details
              </h2>

              {/* Service Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
                >
                  {Object.entries(pricing).map(([key, { name }]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Signatures */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Signatures
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSignatures(Math.max(1, signatures - 1))}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold text-midwest-navy w-12 text-center">
                    {signatures}
                  </span>
                  <button
                    onClick={() => setSignatures(signatures + 1)}
                    className="w-10 h-10 bg-midwest-gold rounded-full flex items-center justify-center hover:bg-yellow-400"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Count (for real estate) */}
              {serviceType === 'realEstate' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Documents
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setDocumentCount(Math.max(1, documentCount - 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-bold text-midwest-navy w-12 text-center">
                      {documentCount}
                    </span>
                    <button
                      onClick={() => setDocumentCount(documentCount + 1)}
                      className="w-10 h-10 bg-midwest-gold rounded-full flex items-center justify-center hover:bg-yellow-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Travel Distance */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="w-4 h-4 inline mr-1" />
                  Travel Distance (miles) - 0 for in-office
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={travelMiles}
                  onChange={(e) => setTravelMiles(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>In-Office</span>
                  <span className="font-semibold text-midwest-navy">{travelMiles} miles</span>
                  <span>50+ miles</span>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRush}
                    onChange={(e) => setIsRush(e.target.checked)}
                    className="w-5 h-5 text-midwest-gold rounded focus:ring-midwest-gold"
                  />
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-red-500" />
                    Rush Service (Same Day) +50%
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isWeekend}
                    onChange={(e) => setIsWeekend(e.target.checked)}
                    className="w-5 h-5 text-midwest-gold rounded focus:ring-midwest-gold"
                  />
                  <span>Weekend Appointment +$25</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEvening}
                    onChange={(e) => setIsEvening(e.target.checked)}
                    className="w-5 h-5 text-midwest-gold rounded focus:ring-midwest-gold"
                  />
                  <span>Evening (After 6pm) +$15</span>
                </label>
              </div>
            </div>

            {/* Estimate Display */}
            <div>
              <div className="bg-gradient-to-br from-midwest-navy to-blue-900 rounded-xl shadow-lg p-6 text-white sticky top-4">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Estimated Total
                </h2>

                {/* Breakdown */}
                <div className="space-y-3 mb-6">
                  {breakdown().map(({ label, amount }, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-300">{label}</span>
                      <span className="text-midwest-wheat">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Estimate</span>
                    <span className="text-4xl font-bold text-midwest-gold">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  * This is an estimate only. Final pricing may vary based on specific requirements.
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={`tel:+15551234567`}
                    className="block w-full bg-midwest-gold text-midwest-navy text-center py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    Call to Book
                  </a>
                  <a
                    href={`sms:+15551234567?body=Hi, I'd like to schedule a ${pricing[serviceType].name} service. Estimated cost: $${calculateTotal()}`}
                    className="block w-full bg-white/10 text-white text-center py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    Text to Book
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-midwest-navy mb-4">Pricing Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Base Rates</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• General Notarization: $15 per signature</li>
                  <li>• Real Estate Closing: $150 base</li>
                  <li>• Healthcare Documents: $25 base</li>
                  <li>• Legal Documents: $20 base</li>
                  <li>• Apostille Services: $75 base</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Additional Fees</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Mobile Service: $25 base (first 10 miles)</li>
                  <li>• Extended Travel: $2 per mile (after 10 miles)</li>
                  <li>• Rush Service: +50% of total</li>
                  <li>• Weekend: +$25</li>
                  <li>• Evening (after 6pm): +$15</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
