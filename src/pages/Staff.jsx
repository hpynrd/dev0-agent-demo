import { useState } from 'react';
import { 
  Users, Calculator, MessageSquare, Send, Phone, Clock, 
  CheckCircle, AlertCircle, DollarSign, FileText, Bell
} from 'lucide-react';

export default function Staff() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [smsForm, setSmsForm] = useState({
    recipient: '',
    message: '',
    template: '',
  });
  const [smsSent, setSmsSent] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);

  // Calculator state
  const [calcServiceType, setCalcServiceType] = useState('general');
  const [calcSignatures, setCalcSignatures] = useState(1);
  const [calcTravelMiles, setCalcTravelMiles] = useState(0);
  const [calcIsRush, setCalcIsRush] = useState(false);
  const [calcIsWeekend, setCalcIsWeekend] = useState(false);
  const [calcIsEvening, setCalcIsEvening] = useState(false);
  const [calcDocumentCount, setCalcDocumentCount] = useState(1);

  const pricing = {
    general: { base: 15, perSignature: 15, name: 'General Notarization' },
    realEstate: { base: 150, perSignature: 0, name: 'Real Estate Closing' },
    healthcare: { base: 25, perSignature: 10, name: 'Healthcare Documents' },
    legal: { base: 20, perSignature: 15, name: 'Legal Documents' },
    apostille: { base: 75, perSignature: 25, name: 'Apostille Services' },
  };

  const smsTemplates = [
    { id: 'appointment', name: 'Appointment Reminder', text: 'Hi {name}, this is a reminder of your notary appointment on {date} at {time}. Please bring valid ID. Reply CONFIRM to confirm or call (555) 123-4567 to reschedule.' },
    { id: 'ready', name: 'Documents Ready', text: 'Hi {name}, your notarized documents are ready for pickup at our office. Office hours: Mon-Fri 8am-6pm, Sat 9am-2pm.' },
    { id: 'payment', name: 'Payment Reminder', text: 'Hi {name}, this is a reminder that your payment of ${amount} for notary services is due. Pay online at heartlandnotary.com/payment or call (555) 123-4567.' },
    { id: 'followup', name: 'Follow-up', text: 'Hi {name}, thank you for using Heartland Notary Services! We hope everything went smoothly. Please let us know if you need anything else.' },
    { id: 'custom', name: 'Custom Message', text: '' },
  ];

  const calculateTotal = () => {
    const service = pricing[calcServiceType];
    let total = service.base;
    
    if (service.perSignature > 0) {
      total += (calcSignatures - 1) * service.perSignature;
    }
    
    if (calcServiceType === 'realEstate' && calcDocumentCount > 1) {
      total += (calcDocumentCount - 1) * 25;
    }
    
    if (calcTravelMiles > 10) {
      total += (calcTravelMiles - 10) * 2;
    } else if (calcTravelMiles > 0) {
      total += 25;
    }
    
    if (calcIsRush) {
      total *= 1.5;
    }
    
    if (calcIsWeekend) {
      total += 25;
    }
    
    if (calcIsEvening) {
      total += 15;
    }
    
    return total.toFixed(2);
  };

  const handleTemplateChange = (templateId) => {
    const template = smsTemplates.find(t => t.id === templateId);
    setSmsForm({
      ...smsForm,
      template: templateId,
      message: template ? template.text : '',
    });
  };

  const handleSendSms = async (e) => {
    e.preventDefault();
    setSmsLoading(true);
    
    // Simulate sending SMS via Twilio
    // In production, this would call your backend API
    console.log('Sending SMS to:', smsForm.recipient);
    console.log('Message:', smsForm.message);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSmsSent(true);
    setSmsLoading(false);
    
    setTimeout(() => {
      setSmsSent(false);
      setSmsForm({ recipient: '', message: '', template: '' });
    }, 3000);
  };

  const recentActivity = [
    { type: 'payment', client: 'John Smith', amount: 150, time: '10 min ago' },
    { type: 'appointment', client: 'Maria Garcia', service: 'Real Estate', time: '25 min ago' },
    { type: 'sms', client: 'Robert Johnson', message: 'Appointment confirmed', time: '1 hour ago' },
    { type: 'payment', client: 'Sarah Williams', amount: 45, time: '2 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-midwest-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-midwest-gold rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-midwest-navy" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Staff Portal</h1>
                <p className="text-midwest-wheat text-sm">Heartland Notary Services</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-white/10 rounded-full">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="text-right">
                <p className="font-medium">Welcome, Staff</p>
                <p className="text-xs text-midwest-wheat">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'calculator', label: 'Price Calculator', icon: Calculator },
              { id: 'sms', label: 'Send SMS', icon: MessageSquare },
              { id: 'activity', label: 'Recent Activity', icon: Clock },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-midwest-gold text-midwest-navy'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Calculator Tab */}
          {activeTab === 'calculator' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-midwest-navy mb-6 flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Quick Quote Calculator
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type
                    </label>
                    <select
                      value={calcServiceType}
                      onChange={(e) => setCalcServiceType(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold"
                    >
                      {Object.entries(pricing).map(([key, { name }]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Signatures
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={calcSignatures}
                        onChange={(e) => setCalcSignatures(parseInt(e.target.value) || 1)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Travel (miles)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={calcTravelMiles}
                        onChange={(e) => setCalcTravelMiles(parseInt(e.target.value) || 0)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold"
                      />
                    </div>
                  </div>

                  {calcServiceType === 'realEstate' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Count
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={calcDocumentCount}
                        onChange={(e) => setCalcDocumentCount(parseInt(e.target.value) || 1)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold"
                      />
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={calcIsRush}
                        onChange={(e) => setCalcIsRush(e.target.checked)}
                        className="w-5 h-5 text-midwest-gold rounded"
                      />
                      <span>Rush Service (+50%)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={calcIsWeekend}
                        onChange={(e) => setCalcIsWeekend(e.target.checked)}
                        className="w-5 h-5 text-midwest-gold rounded"
                      />
                      <span>Weekend (+$25)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={calcIsEvening}
                        onChange={(e) => setCalcIsEvening(e.target.checked)}
                        className="w-5 h-5 text-midwest-gold rounded"
                      />
                      <span>Evening (+$15)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-midwest-navy to-blue-900 rounded-xl shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Quote Summary
                </h2>

                <div className="bg-white/10 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-300 mb-2">Total Estimate</p>
                  <p className="text-5xl font-bold text-midwest-gold">${calculateTotal()}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Service:</span>
                    <span>{pricing[calcServiceType].name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Signatures:</span>
                    <span>{calcSignatures}</span>
                  </div>
                  {calcTravelMiles > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Travel:</span>
                      <span>{calcTravelMiles} miles</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => {
                      const quote = `Service: ${pricing[calcServiceType].name}\nSignatures: ${calcSignatures}\nTravel: ${calcTravelMiles} miles\nTotal: $${calculateTotal()}`;
                      navigator.clipboard.writeText(quote);
                      alert('Quote copied to clipboard!');
                    }}
                    className="w-full bg-midwest-gold text-midwest-navy py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    Copy Quote
                  </button>
                  <button
                    onClick={() => {
                      setSmsForm({
                        ...smsForm,
                        message: `Your notary service quote:\n${pricing[calcServiceType].name}\nTotal: $${calculateTotal()}\n\nCall (555) 123-4567 to schedule.`,
                      });
                      setActiveTab('sms');
                    }}
                    className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    Send Quote via SMS
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SMS Tab */}
          {activeTab === 'sms' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-midwest-navy mb-6 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send SMS Notification
                  </h2>

                  {smsSent ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Message Sent!</h3>
                      <p className="text-gray-600">SMS delivered successfully</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSendSms} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recipient Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={smsForm.recipient}
                          onChange={(e) => setSmsForm({ ...smsForm, recipient: e.target.value })}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message Template
                        </label>
                        <select
                          value={smsForm.template}
                          onChange={(e) => handleTemplateChange(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold"
                        >
                          <option value="">Select a template...</option>
                          {smsTemplates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          value={smsForm.message}
                          onChange={(e) => setSmsForm({ ...smsForm, message: e.target.value })}
                          required
                          rows={5}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold"
                          placeholder="Enter your message..."
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {smsForm.message.length}/160 characters
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={smsLoading}
                        className="w-full bg-midwest-navy text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {smsLoading ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send SMS</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-bold text-midwest-navy mb-4">SMS Service Info</h3>
                  <div className="space-y-4 text-sm">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Twilio Integration</h4>
                      <p className="text-blue-700">
                        SMS notifications are sent via Twilio. Standard messaging rates apply.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Template Variables</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li><code className="bg-gray-100 px-1">{'{name}'}</code> - Client name</li>
                        <li><code className="bg-gray-100 px-1">{'{date}'}</code> - Appointment date</li>
                        <li><code className="bg-gray-100 px-1">{'{time}'}</code> - Appointment time</li>
                        <li><code className="bg-gray-100 px-1">{'{amount}'}</code> - Payment amount</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-midwest-wheat/30 rounded-xl p-6 mt-6">
                  <h3 className="font-bold text-midwest-navy mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleTemplateChange('appointment')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      📅 Send Appointment Reminder
                    </button>
                    <button
                      onClick={() => handleTemplateChange('payment')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      💳 Send Payment Reminder
                    </button>
                    <button
                      onClick={() => handleTemplateChange('ready')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      📄 Documents Ready Notice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-midwest-navy mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </h2>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'payment' ? 'bg-green-100' :
                        activity.type === 'appointment' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'payment' && <DollarSign className="w-5 h-5 text-green-600" />}
                        {activity.type === 'appointment' && <FileText className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'sms' && <MessageSquare className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.client}</p>
                        <p className="text-sm text-gray-500">
                          {activity.type === 'payment' && `Payment received: $${activity.amount}`}
                          {activity.type === 'appointment' && `${activity.service} appointment scheduled`}
                          {activity.type === 'sms' && `SMS: ${activity.message}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="text-midwest-navy hover:text-midwest-gold font-medium">
                  View All Activity →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
