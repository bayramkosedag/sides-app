"use client";

import React, { useState } from 'react';
import { Shield, Scale, BookOpen, HeartHandshake, AlertTriangle, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const SignUpStep2 = () => {
  const [checkedState, setCheckedState] = useState({
    focus: false,
    honesty: false,
    evidence: false,
    courtesy: false,
    responsibility: false,
  });

  const allChecked = Object.values(checkedState).every(Boolean);

  const handleCheck = (key: keyof typeof checkedState) => {
    setCheckedState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rotate-45 rounded-md flex items-center justify-center">
             <div className="w-4 h-4 bg-white/20 rotate-45" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">Sides</span>
        </div>
        <span className="text-sm text-slate-400">Adım 2/4</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center py-6 px-4 overflow-hidden">
        <div className="w-full max-w-2xl h-full flex flex-col max-h-[800px]">
          
          {/* İlerleme Çubuğu */}
          <div className="mb-4 shrink-0">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-500 font-medium">Logos Pledge</span>
              <span className="text-slate-500">Sıradaki: Mantık Testi</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div className="h-full w-1/4 bg-blue-600"></div>
              <div className="h-full w-1/4 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] border-l border-slate-900"></div>
              <div className="h-full w-1/4 border-l border-slate-900 bg-slate-800/50"></div>
              <div className="h-full w-1/4 border-l border-slate-900 bg-slate-800/50"></div>
            </div>
          </div>

          {/* Form Kartı */}
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-6 shadow-2xl flex flex-col flex-1 overflow-hidden">
            
            <div className="text-center mb-4 shrink-0">
              <h1 className="text-2xl font-bold text-white mb-1">Dijital Anayasa</h1>
              <p className="text-slate-400 text-sm">Platformda var olabilmek için bu ilkeleri kabul etmelisiniz.</p>
            </div>

            {/* Scrollable List Area */}
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
              
              <PledgeItem 
                icon={<Shield className="w-4 h-4 text-emerald-400" />}
                title="Odak Noktası"
                desc="Kişilere değil, sadece argümanlara saldıracağım."
                checked={checkedState.focus}
                onChange={() => handleCheck('focus')}
              />

              <PledgeItem 
                icon={<Scale className="w-4 h-4 text-amber-400" />}
                title="Dürüstlük"
                desc="Kanıt sunulduğunda, egoma yenilmeden doğruya teslim olacağım."
                checked={checkedState.honesty}
                onChange={() => handleCheck('honesty')}
              />

              <PledgeItem 
                icon={<BookOpen className="w-4 h-4 text-blue-400" />}
                title="Kanıt Zorunluluğu"
                desc="İddialarımı mümkün olduğunca doğrulanabilir verilerle destekleyeceğim."
                checked={checkedState.evidence}
                onChange={() => handleCheck('evidence')}
              />

              <PledgeItem 
                icon={<HeartHandshake className="w-4 h-4 text-rose-400" />}
                title="Nezaket"
                desc="Hakaret veya aşağılayıcı dilin rütbemi düşüreceğini biliyorum."
                checked={checkedState.courtesy}
                onChange={() => handleCheck('courtesy')}
              />

               <PledgeItem 
                icon={<AlertTriangle className="w-4 h-4 text-purple-400" />}
                title="Sorumluluk"
                desc="Safsata yaptığımda sistemin beni uyarmasını kabul ediyorum."
                checked={checkedState.responsibility}
                onChange={() => handleCheck('responsibility')}
              />

            </div>

            {/* Aksiyon Butonları */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700/50 shrink-0">
              <button className="px-4 py-3 rounded-lg text-slate-400 hover:text-white font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" /> Geri
              </button>
              
              <button 
                disabled={!allChecked}
                className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm
                  ${allChecked 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] cursor-pointer' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
              >
                Sözleşmeyi İmzala
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// Alt Bileşen
const PledgeItem = ({ icon, title, desc, checked, onChange }: any) => (
  <div 
    onClick={onChange}
    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 group
      ${checked 
        ? 'bg-blue-900/10 border-blue-500/50' 
        : 'bg-[#0F172A] border-slate-700 hover:border-slate-600'}`}
  >
    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0
      ${checked 
        ? 'bg-blue-500 border-blue-500 text-white' 
        : 'border-slate-600 group-hover:border-slate-500'}`}>
      {checked && <Check className="w-3 h-3" />}
    </div>

    <div>
      <div className="flex items-center gap-2 mb-0.5">
        {icon}
        <h3 className={`font-semibold text-sm ${checked ? 'text-blue-100' : 'text-slate-200'}`}>{title}</h3>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default SignUpStep2;