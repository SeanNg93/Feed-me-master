import React from 'react';
import { Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const icons = ["🧋", "🍛", "📺", "☕", "🎮", "💅", "🎁", "📱", "🎬", "✨"];

const FinancialReport: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-orange mb-4">{t.financial.title}</h2>
          <p className="text-gray-600">{t.financial.subtitle}</p>
        </div>

        {/* Warning Box */}
        <div className="bg-orange-100 border-l-4 border-brand-orange p-6 rounded-r-xl mb-12 flex items-start space-x-4">
          <div className="bg-white p-2 rounded-full shadow-sm text-brand-orange mt-1">
            <Lock size={20} />
          </div>
          <div>
            <h4 className="font-bold text-brand-orange text-lg mb-1">{t.financial.alertTitle}</h4>
            <p className="text-sm text-orange-800 leading-relaxed">
              {t.financial.alertContent}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 bg-brand-cream border-b border-gray-100">
            <h3 className="text-xl font-bold text-brand-orange">{t.financial.tableTitle}</h3>
          </div>
          
          <div className="divide-y divide-gray-50">
            {t.financial.items.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{icons[idx] || "📦"}</span>
                  <div>
                    <div className="font-medium text-gray-800">{item.name}</div>
                    {item.calculation && <div className="text-xs text-gray-400">{item.calculation}</div>}
                  </div>
                </div>
                <div className="font-bold text-brand-orange">{item.total}</div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-brand-cream border-t border-gray-100 flex justify-between items-center">
             <div className="flex items-center space-x-2 text-brand-dark font-bold">
               <span>💰</span>
               <span>{t.financial.totalLabel}</span>
             </div>
             <div className="text-2xl font-extrabold text-brand-yellow drop-shadow-sm animate-blink-text">
               {t.financial.totalValue}
             </div>
          </div>
        </div>

        <div className="text-center mt-6 space-y-2">
            <p className="text-xs text-gray-400 italic">{t.financial.note1}</p>
            <p className="text-[10px] text-gray-300 italic">{t.financial.note2}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;