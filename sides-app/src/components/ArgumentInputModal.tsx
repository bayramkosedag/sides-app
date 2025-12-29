"use client";

import React, { useState } from 'react';
import { X, Send, Link as LinkIcon, AlertTriangle, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ArgumentInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  // YENİ: Veriyi dışarı (Room'a) gönderme fonksiyonu
  onSubmit: (text: string, type: 'pro' | 'con') => void;
}

const ArgumentInputModal = ({ isOpen, onClose, onSubmit }: ArgumentInputModalProps) => {
  const [argumentType, setArgumentType] = useState<'pro' | 'con'>('pro');
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<'clean' | 'fallacy' | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!text) return;
    setIsAnalyzing(true);
    setAiFeedback(null);

    // Sahte AI beklemesi
    setTimeout(() => {
      setIsAnalyzing(false);
      if (text.length < 10) {
        setAiFeedback('fallacy');
      } else {
        setAiFeedback('clean');
      }
    }, 1000);
  };

  const handlePublish = () => {
    // DÜZELTME: Veriyi üst bileşene gönder ve modalı kapat
    onSubmit(text, argumentType);
    setText(''); // Kutuyu temizle
    setAiFeedback(null); // Analizi sıfırla
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1E293B] w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        
        {/* Başlık */}
        <div className="flex justify-between items-center p-5 border-b border-slate-700">
          <h3 className="text-white font-bold text-lg">Argüman Ekle</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* İçerik */}
        <div className="p-6 space-y-6">
          
          {/* Taraf Seçimi */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Tarafını Seç</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setArgumentType('pro')}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all
                  ${argumentType === 'pro' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
              >
                <CheckCircle2 className="w-4 h-4" /> Destekliyorum
              </button>
              <button
                 onClick={() => setArgumentType('con')}
                 className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all
                  ${argumentType === 'con' ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
              >
                <X className="w-4 h-4" /> Çürütüyorum
              </button>
            </div>
          </div>

          {/* Metin Alanı */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Mantıksal önermeni buraya yaz..."
              className="w-full h-32 bg-[#0F172A] border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            />
            <span className="absolute bottom-3 right-3 text-xs text-slate-600">{text.length}/280</span>
          </div>

          {/* AI Sonuç */}
          {aiFeedback === 'fallacy' && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-amber-200 text-sm font-bold">Uyarı: Çok Kısa</h4>
                <p className="text-amber-200/70 text-xs mt-1">Argümanınızın geçerli olması için daha detaylı bir neden sunmalısınız.</p>
              </div>
            </div>
          )}

           {aiFeedback === 'clean' && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-emerald-200 text-sm font-bold">Mantık Onaylandı</h4>
                <p className="text-emerald-200/70 text-xs">Yayınlamaya uygun.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-700 flex justify-end gap-3 bg-[#0F172A]/50">
          <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">İptal</button>

          {!aiFeedback || aiFeedback === 'fallacy' ? (
             <button 
             onClick={handleAnalyze}
             disabled={!text || isAnalyzing}
             className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
           >
             {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
             {isAnalyzing ? 'Taranıyor...' : 'Mantığı Denetle'}
           </button>
          ) : (
            <button 
            onClick={handlePublish} // <-- Burası değişti
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
          >
            <Send className="w-4 h-4" /> Yayınla
          </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ArgumentInputModal;