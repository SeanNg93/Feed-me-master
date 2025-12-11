import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Pricing from './components/Pricing';
import FinancialReport from './components/FinancialReport';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CodeGenerator from './components/CodeGenerator';
import Footer from './components/Footer';
import DonateModal from './components/DonateModal';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleOpenDonate = (amount: number = 0) => {
    setDonationAmount(amount);
    setShowDonateModal(true);
  };

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <Hero 
        onDonate={handleOpenDonate} 
        onScrollToPricing={handleScrollToPricing}
      />
      <About />
      <Pricing 
        onDonate={handleOpenDonate} 
        id="pricing-section"
      />
      <FinancialReport />
      <Testimonials />
      <FAQ />
      <CodeGenerator />
      <Footer onDonate={() => handleOpenDonate(0)} />
      
      <DonateModal 
        isOpen={showDonateModal} 
        onClose={() => setShowDonateModal(false)} 
        amount={donationAmount}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;