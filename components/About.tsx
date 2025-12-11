import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-20 px-4 bg-brand-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-orange mb-4">{t.about.title}</h2>
          <p className="text-gray-600">{t.about.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-orange rounded-3xl transform translate-x-4 translate-y-4 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop" 
                alt="Sad person need money" 
                className="relative rounded-3xl w-full h-[400px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6 text-gray-700">
            <p>
              {t.about.intro} <span className="font-bold text-brand-orange">{t.about.introBold}</span> {t.about.introRest}
            </p>
            <p>
              {t.about.insight} <span className="font-bold text-red-500">{t.about.insightBold}</span>
              {t.about.insightRest}
            </p>
            <p>
              {t.about.cost} <span className="font-bold text-brand-orange">{t.about.costBold}</span>
              {t.about.costRest} <span className="italic"> {t.about.transparency}</span> {t.about.transparencyRest}
            </p>
            <div className="bg-orange-100 p-4 rounded-xl border border-orange-200 text-sm">
              <span className="font-bold text-brand-orange">{t.about.note}</span> {t.about.noteContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;