import React, { useState, useEffect } from 'react';
import { Soup, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onDonate: (amount?: number) => void;
  onScrollToPricing: () => void;
}

// Component for a single scrolling digit (Top to Bottom logic)
const ScrollingDigit: React.FC<{ value: string }> = ({ value }) => {
  if (isNaN(parseInt(value))) {
    return <span>{value}</span>;
  }

  const numVal = parseInt(value);
  // To simulate Top to Bottom scroll, we stack numbers 9...0
  // When number increases (e.g. 1 -> 2), 2 is visually "above" 1 in the stack.
  // We translate to the position of the new number.
  // Using 9 - numVal maps 9->0 (top), 0->9 (bottom).
  // Actually, standard list is 0..9.
  // If list is [0, 1, 2...9]
  // To show 1: translateY(-10%). To show 2: translateY(-20%). Strip moves UP. 2 comes from BOTTOM.
  // To show 2 from TOP: 2 must be above 1.
  // So list must be [9, 8, ... 2, 1, 0].
  // If current is 1 (index 8). Next is 2 (index 7).
  // Translate moves from -80% to -70%. Strip moves DOWN. 2 appears from TOP.

  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const index = numbers.indexOf(numVal);

  return (
    <div className="inline-block relative h-[1em] overflow-hidden align-bottom">
      <div 
        className="transition-transform duration-500 ease-in-out flex flex-col"
        style={{ transform: `translateY(-${index * 10}%)` }}
      >
        {numbers.map((num) => (
          <span key={num} className="h-[1em] flex items-center justify-center">
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

// Component to split number into scrolling digits
const ScrollingNumber: React.FC<{ value: number }> = ({ value }) => {
  const digits = value.toLocaleString().split('');
  
  return (
    <div className="inline-flex font-bold tabular-nums leading-none overflow-hidden h-10">
      {digits.map((digit, index) => (
        <ScrollingDigit key={`${index}-${digit}`} value={digit} />
      ))}
    </div>
  );
};

// Background images for the slider
const backgroundImages = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop", // Charity/Kids
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000&auto=format&fit=crop", // Party/Happy
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2000&auto=format&fit=crop", // Giving/Hands
  "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2000&auto=format&fit=crop"  // Nature/Friends
];

const Hero: React.FC<HeroProps> = ({ onDonate, onScrollToPricing }) => {
  const [donorCount, setDonorCount] = useState(1234);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  // Background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto increment donor count every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDonorCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <div className="relative text-white pb-20 min-h-[700px] overflow-hidden bg-brand-dark">
      
      {/* Background Carousel */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />
          
          <img 
            src={img} 
            alt="Background" 
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
              index === currentImageIndex ? 'scale-110' : 'scale-100'
            }`} 
          />
        </div>
      ))}

      {/* Navbar & Content Container */}
      <div className="relative z-20">
        <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
          <div className="flex items-center space-x-2 font-bold text-2xl">
            <Soup className="text-pink-500 fill-pink-500" size={32} />
            <span className="text-white drop-shadow-md">{t.hero.title}</span>
          </div>
          
          <div className="flex items-center space-x-3">
             <button 
              onClick={toggleLanguage}
              className="bg-white/20 hover:bg-white/30 text-white font-medium px-3 py-2 rounded-full transition-colors flex items-center space-x-1 backdrop-blur-sm"
            >
              <Globe size={18} />
              <span className="uppercase text-sm">{language}</span>
            </button>
            
            <button 
              onClick={onScrollToPricing}
              className="bg-brand-yellow text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-300 transition-colors shadow-lg border-2 border-transparent hover:border-white/20 hidden md:block"
            >
              {t.hero.donateBtn}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="text-center px-4 mt-16 md:mt-28 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg text-white">
            {t.hero.title}
          </h1>
          <h2 className="text-xl md:text-3xl font-bold mb-8 text-white/90 drop-shadow-md">
            {t.hero.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            {t.hero.desc}
          </p>

          <button 
            onClick={onScrollToPricing}
            className="bg-brand-yellow text-black text-lg font-bold px-10 py-4 rounded-full hover:bg-yellow-300 transition-transform hover:scale-105 shadow-xl flex items-center mx-auto gap-2 border-2 border-transparent hover:border-white/20"
          >
            {t.hero.cta} <Heart className="text-pink-600 fill-pink-600" size={20} />
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-20 text-center bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div>
              <div className="text-4xl font-bold text-brand-yellow mb-1">1</div>
              <div className="text-sm md:text-base text-white/90">{t.hero.stats.receiver}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-yellow mb-1 flex justify-center">
                <ScrollingNumber value={donorCount} />
              </div>
              <div className="text-sm md:text-base text-white/90">{t.hero.stats.donors}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-yellow mb-1">196</div>
              <div className="text-sm md:text-base text-white/90">{t.hero.stats.goal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;