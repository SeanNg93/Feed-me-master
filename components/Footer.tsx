import React from 'react';
import { Soup, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onDonate: () => void;
}

const Footer: React.FC<FooterProps> = ({ onDonate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-gray-400 py-16 px-4 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 font-bold text-xl text-white">
            <Soup className="text-brand-orange" />
            <span>{t.hero.title}</span>
          </div>
          <p className="leading-relaxed">
            {t.footer.desc}
          </p>
          <div className="italic text-xs border-l-2 border-brand-orange pl-3 text-gray-500">
            {t.footer.quote}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-base">{t.footer.contact}</h4>
          <div className="flex items-center space-x-3">
            <Mail size={16} className="text-brand-orange" />
            <span>support@nuoitoi.vn</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={16} className="text-brand-orange" />
            <span>1900-NUOI-TOI</span>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-base">{t.footer.links}</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={onDonate} className="hover:text-brand-orange transition-colors">
                {t.footer.donate}
              </button>
            </li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">{t.footer.report}</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">{t.footer.statement}</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">{t.footer.faq}</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-base">{t.footer.legal}</h4>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
               <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
               <span>{t.footer.license}</span>
            </li>
            <li className="flex items-center space-x-2">
               <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
               <span>{t.footer.audit}</span>
            </li>
            <li className="flex items-center space-x-2">
               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
               <span>{t.footer.type}</span>
            </li>
          </ul>
          <p className="text-[10px] leading-tight mt-4">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
         <p>{t.footer.copyright}</p>
         <p className="mt-2 text-gray-600">{t.footer.inspiration}</p>
      </div>
    </footer>
  );
};

export default Footer;