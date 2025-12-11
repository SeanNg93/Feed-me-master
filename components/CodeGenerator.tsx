import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CodeGenerator: React.FC = () => {
  const [code, setCode] = useState("NT-74854");
  const { t } = useLanguage();

  const generateCode = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    setCode(`NT-${random}`);
  };

  return (
    <div className="relative py-24 px-4 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-orange/90 mix-blend-multiply z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop" 
          alt="Charity Background" 
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="relative z-20 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t.generator.title}</h2>
        <p className="text-orange-100 mb-10">{t.generator.subtitle}</p>

        <div className="bg-white rounded-3xl p-8 shadow-2xl text-gray-800 transform rotate-1 hover:rotate-0 transition-transform duration-300">
           <div className="uppercase text-xs font-bold text-gray-400 mb-2 tracking-widest">{t.generator.label}</div>
           <div className="text-5xl md:text-6xl font-mono font-bold text-brand-orange mb-8 tracking-widest">
             {code}
           </div>
           
           <button 
             onClick={generateCode}
             className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center mx-auto space-x-2 shadow-lg"
           >
             <RefreshCw size={20} />
             <span>{t.generator.btn}</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;