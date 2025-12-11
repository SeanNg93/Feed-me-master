import React from 'react';
import { PricingPackage } from '../types';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PricingProps {
  onDonate: (amount: number) => void;
  id?: string;
}

const Pricing: React.FC<PricingProps> = ({ onDonate, id }) => {
  const { t } = useLanguage();

  const handleSelectPackage = (priceStr: string) => {
    // Convert "450.000đ" -> 450000
    // Works for both "450.000đ" and English equivalent logic if needed, 
    // but assuming price stays numeric visual in this demo
    const amount = parseInt(priceStr.replace(/\./g, '').replace('đ', ''));
    onDonate(amount);
  };

  const packages: PricingPackage[] = [
    {
      name: t.pricing.basic,
      price: "450.000đ",
      duration: t.pricing.perMonth,
      features: [
        { text: t.pricing.features.milkTea, value: "45 ly", included: true },
        { text: t.pricing.features.lunch, value: t.pricing.features.meals60, included: true },
        { text: t.pricing.features.gas, value: t.pricing.features.none, included: false },
        { text: t.pricing.features.netflix, value: t.pricing.features.shared, included: false },
        { text: t.pricing.features.photos, value: t.pricing.features.maybe, included: true },
      ]
    },
    {
      name: t.pricing.standard,
      price: "1.450.000đ",
      duration: t.pricing.perYear,
      isPopular: true,
      features: [
        { text: t.pricing.features.milkTea, value: t.pricing.features.unlimited, included: true },
        { text: t.pricing.features.lunch, value: t.pricing.features.meals365, included: true },
        { text: t.pricing.features.gas, value: `5 ${t.pricing.features.million}`, included: true },
        { text: t.pricing.features.netflixPrem, value: "Có", included: true },
        { text: t.pricing.features.photos, value: t.pricing.features.monthly, included: true },
        { text: t.pricing.features.code, value: t.pricing.features.exclusive, included: true },
      ]
    },
    {
      name: t.pricing.vip,
      price: "5.000.000đ",
      duration: t.pricing.perYear,
      isVip: true,
      features: [
        { text: t.pricing.features.starbucks, value: t.pricing.features.daily, included: true },
        { text: t.pricing.features.restaurant, value: t.pricing.features.twiceMonth, included: true },
        { text: t.pricing.features.travel, value: t.pricing.features.onceYear, included: true },
        { text: t.pricing.features.nameOnWeb, value: t.pricing.features.maybe, included: true },
        { text: t.pricing.features.videoCall, value: t.pricing.features.quarterly, included: true },
        { text: "All Standard", included: true },
      ]
    }
  ];

  return (
    <div id={id} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-orange mb-4">{t.pricing.title}</h2>
          <p className="text-gray-600">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-3xl p-8 relative transition-all duration-300 hover:z-20 group ${
                pkg.isPopular 
                  ? 'border-4 border-brand-yellow shadow-2xl scale-105 z-10 hover:scale-[1.08]' 
                  : 'border border-gray-100 shadow-xl hover:shadow-2xl hover:scale-105'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-yellow text-black font-bold px-4 py-1 rounded-full text-sm">
                  {t.pricing.popular}
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-4 ${pkg.isVip ? 'text-brand-orange' : 'text-brand-orange'}`}>
                {pkg.name}
              </h3>
              
              <div className="flex items-baseline mb-8 group-hover:-translate-y-1 transition-transform duration-300">
                <span className="text-3xl font-extrabold text-gray-900">{pkg.price}</span>
                <span className="text-gray-500 ml-2">{pkg.duration}</span>
              </div>

              <div className="space-y-4 mb-8">
                {pkg.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex justify-between items-center text-sm border-b border-dashed border-gray-100 pb-2 last:border-0">
                    <span className="text-gray-600">{feature.text}</span>
                    {feature.value ? (
                      <span className={`font-bold ${
                        feature.value === 'Không' || feature.value === 'No' ? 'text-red-400' : 
                        feature.value === 'Có thể có' || feature.value === 'Maybe' ? 'text-orange-400' : 
                        feature.value === 'Độc quyền*' || feature.value === 'Exclusive*' ? 'text-brand-orange' : 
                        'text-brand-orange'
                      }`}>
                        {feature.value}
                      </span>
                    ) : (
                      feature.included ? <Check className="text-green-500" size={18} /> : <X className="text-red-400" size={18} />
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSelectPackage(pkg.price)}
                className={`w-full py-4 rounded-full font-bold transition-all ${
                  pkg.isPopular 
                    ? 'bg-brand-yellow text-black hover:bg-yellow-300' 
                    : 'bg-brand-orange text-white hover:bg-orange-600'
                }`}
              >
                {t.pricing.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;