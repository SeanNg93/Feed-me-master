import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose, amount }) => {
  const [copied, setCopied] = useState(false);
  const accountNum = "8876129855";
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Construct VietQR URL
  let qrUrl = `https://img.vietqr.io/image/BIDV-${accountNum}-compact.png?accountName=NGUYEN%20HOANG%20SON`;
  if (amount > 0) {
    qrUrl += `&amount=${amount}&addInfo=Nuoi%20toi`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn scale-100">
        <div className="bg-brand-orange p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">{t.modal.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center">
          <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-lg mb-6">
            <img 
              src={qrUrl}
              alt="QR Code Donate" 
              className="w-64 h-auto rounded-lg"
            />
          </div>

          <div className="w-full space-y-3 text-center">
            {amount > 0 && (
                <div className="bg-yellow-50 text-brand-orange font-bold py-2 px-4 rounded-full inline-block mb-2 text-sm border border-yellow-100">
                   {t.modal.supporting} {amount.toLocaleString('vi-VN')}đ
                </div>
            )}

            <div>
              <div className="text-gray-500 text-sm">{t.modal.owner}</div>
              <div className="font-bold text-xl text-brand-dark uppercase">NGUYEN HOANG SON</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100">
              <div className="text-left">
                <div className="text-gray-500 text-xs">{t.modal.account}</div>
                <div className="font-mono font-bold text-lg text-brand-orange">{accountNum}</div>
              </div>
              <button 
                onClick={handleCopy}
                className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-brand-orange"
                title="Copy số tài khoản"
              >
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>
            
            <p className="text-xs text-gray-400 mt-4 italic">
              {t.modal.note}
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-brand-cream text-center text-sm text-brand-orange font-medium">
          {t.modal.footer}
        </div>
      </div>
    </div>
  );
};

export default DonateModal;