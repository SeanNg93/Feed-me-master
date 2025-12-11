import React from 'react';
import { Mic2, Music, Heart, Wallet, Bitcoin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// We map colors and icons by index since those aren't text
const visualConfig = [
  { color: "bg-orange-500", icon: Mic2 },
  { color: "bg-purple-500", icon: Music },
  { color: "bg-red-500", icon: Heart },
  { color: "bg-green-500", icon: Wallet },
  { color: "bg-blue-500", icon: Wallet },
  { color: "bg-yellow-500", icon: Bitcoin }
];

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-20 px-4 bg-brand-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-orange mb-4">{t.testimonials.title}</h2>
          <p className="text-gray-600">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.testimonials.reviews.map((review: any, idx: number) => {
            const config = visualConfig[idx] || visualConfig[0];
            const Icon = config.icon;
            
            return (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-4xl text-brand-orange/20 font-serif mb-4">"</div>
                <p className="text-gray-600 italic text-sm mb-6 leading-relaxed min-h-[80px]">
                  {review.quote}
                </p>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;