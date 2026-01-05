import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Calculator from './pages/Calculator';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Staff from './pages/Staff';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/staff" element={<Staff />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
