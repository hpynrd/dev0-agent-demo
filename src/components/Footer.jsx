import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-midwest-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-midwest-gold mb-4">Heartland Notary</h3>
            <p className="text-sm text-gray-300">
              Serving the Midwest with professional notary services for over 25 years. 
              Licensed, bonded, and insured.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-midwest-wheat mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-midwest-gold" />
                <a href="tel:+15551234567" className="hover:text-midwest-gold">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-midwest-gold" />
                <a href="mailto:info@heartlandnotary.com" className="hover:text-midwest-gold">
                  info@heartlandnotary.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-midwest-gold mt-1" />
                <span>123 Main Street<br />Des Moines, IA 50309</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-midwest-wheat mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-midwest-gold" />
                <span>Mon-Fri: 8am - 6pm</span>
              </li>
              <li className="pl-6">Sat: 9am - 2pm</li>
              <li className="pl-6">Sun: By Appointment</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-midwest-wheat mb-4">Service Areas</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>Iowa</li>
              <li>Nebraska</li>
              <li>Kansas</li>
              <li>Missouri</li>
              <li>Illinois</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Heartland Notary Services. All rights reserved.</p>
          <p className="mt-2">Licensed Notary Public | Bonded & Insured</p>
        </div>
      </div>
    </footer>
  );
}
