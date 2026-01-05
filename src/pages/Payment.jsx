import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Lock, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

// Use test publishable key - replace with your actual key in production
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
    });

    if (methodError) {
      setError(methodError.message);
      setIsProcessing(false);
      return;
    }

    // In production, you would send this to your backend to create a PaymentIntent
    // For demo purposes, we'll simulate a successful payment
    console.log('Payment Method created:', paymentMethod.id);
    console.log('Amount:', amount);
    console.log('Invoice:', invoiceNumber);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setPaymentStatus('success');
    setIsProcessing(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1E3A5F',
        '::placeholder': {
          color: '#9CA3AF',
        },
      },
      invalid: {
        color: '#EF4444',
      },
    },
  };

  if (paymentStatus === 'success') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-midwest-navy mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for your payment of ${parseFloat(amount).toFixed(2)}
        </p>
        {invoiceNumber && (
          <p className="text-sm text-gray-500 mb-6">Invoice #{invoiceNumber}</p>
        )}
        <p className="text-sm text-gray-600 mb-6">
          A confirmation has been sent to {customerEmail}
        </p>
        <button
          onClick={() => {
            setPaymentStatus(null);
            setAmount('');
            setInvoiceNumber('');
            setCustomerName('');
            setCustomerEmail('');
            setCustomerPhone('');
          }}
          className="bg-midwest-gold text-midwest-navy px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
        >
          Make Another Payment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-midwest-gold rounded-full flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-midwest-navy" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-midwest-navy">Secure Payment</h2>
          <p className="text-sm text-gray-500">Pay by credit or debit card</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Amount *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              step="0.01"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Invoice Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Invoice Number (if applicable)
          </label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
            placeholder="INV-12345"
          />
        </div>

        {/* Customer Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name on Card *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midwest-gold focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        {/* Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details *
          </label>
          <div className="p-4 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-midwest-gold focus-within:border-transparent">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing || !amount}
          className="w-full bg-midwest-navy text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span>Processing...</span>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Pay ${amount ? parseFloat(amount).toFixed(2) : '0.00'}</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Lock className="w-4 h-4" />
          <span>Secured by Stripe</span>
        </div>
      </div>
    </form>
  );
}

export default function Payment() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-midwest-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-midwest-gold rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-midwest-navy" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Make a Payment</h1>
          <p className="text-xl text-midwest-wheat max-w-2xl mx-auto">
            Secure online payment for notary services
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>

          {/* Payment Info */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-midwest-navy mb-4">Payment Information</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                <strong>Accepted Cards:</strong> Visa, Mastercard, American Express, Discover
              </p>
              <p>
                <strong>Processing:</strong> Payments are processed securely through Stripe. 
                Your card information is never stored on our servers.
              </p>
              <p>
                <strong>Receipts:</strong> A receipt will be emailed to you immediately after 
                your payment is processed.
              </p>
              <p>
                <strong>Questions?</strong> Call us at (555) 123-4567 if you have any questions 
                about your payment.
              </p>
            </div>
          </div>

          {/* Alternative Payment */}
          <div className="mt-6 bg-midwest-wheat/30 rounded-xl p-6 text-center">
            <h3 className="font-semibold text-midwest-navy mb-2">Prefer to Pay by Phone?</h3>
            <p className="text-gray-600 mb-4">
              Call us and we can process your payment over the phone.
            </p>
            <a
              href="tel:+15551234567"
              className="inline-block bg-midwest-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
