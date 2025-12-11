import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-orange mb-4">{t.faq.title}</h2>
          <p className="text-gray-600">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-4">
          {t.faq.questions.map((item: any, idx: number) => (
            <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-brand-orange/30 transition-colors">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-800 text-sm md:text-base">{item.question}</span>
                <span className="text-brand-orange">
                  {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              {openIndex === idx && (
                <div className="p-5 bg-brand-cream text-gray-600 text-sm leading-relaxed border-t border-gray-100 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;