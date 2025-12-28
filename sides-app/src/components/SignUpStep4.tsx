"use client";

import React, { useState } from 'react';
import { Compass, GraduationCap, Check, ArrowRight, ArrowLeft, Hash } from 'lucide-react';

const SignUpStep4 = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [expertise, setExpertise] = useState<string>("");

  // İlgi Alanı Listesi
  const interests = [
    "Hukuk & Adalet", "Teknoloji & AI", "Ekonomi", 
    "Toplumsal Etik", "Siyaset Bilimi", "Eğitim", 
    "Psikoloji", "Felsefe", "Çevre & İklim", 
    "Günlük Yaşam", "Spor", "Sanat & Kültür"
  ];

  // Uzmanlık Seviyeleri
  const expertiseLevels = [
    { id: "student", label: "Öğrenciyim", desc: "İlgili bölümü okuyorum" },
    { id: "professional", label: "Profesyonelim", desc: "Bu alanda çalışıyorum" },
    { id: "academic", label: "Akademisyenim", desc: "Bu alanda ders veriyorum/araştırıyorum" },
    { id: "enthusiast", label: "Sadece Meraklıyım", desc: "Özel bir uzmanlığım yok" }
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 5) { // Maksimum 5 seçim
        setSelectedInterests(prev => [...prev, interest]);
      }
    }
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
        <span className="text-sm text-slate-400">Adım 4/4</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center py-6 px-4">
        <div className="w-full max-w-2xl">
          
          {/* İlerleme */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-500 font-medium">Son Adım</span>
              <span className="text-slate-500">Profiliniz Hazırlanıyor</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div className="h-full w-1/4 bg-blue-600"></div>
              <div className="h-full w-1/4 bg-blue-600"></div>
              <div className="h-full w-1/4 bg-blue-600"></div>
              <div className="h-full w-1/4 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
            </div>
          </div>

          {/* Form Kartı */}
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">İlgi ve Uzmanlık</h1>
              <p className="text-slate-400 text-sm">Sana en uygun tartışmaları bulmamız için haritanı kişiselleştir.</p>
            </div>

            {/* Bölüm 1: İlgi Alanları */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                <Compass className="w-4 h-4 text-blue-400" />
                İlgi Alanların <span className="text-slate-500 font-normal text-xs">(En fazla 5 tane seç)</span>
              </label>
              
              <div className="flex flex-wrap gap-2">
                {interests.map((tag) => {
                  const isSelected = selectedInterests.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleInterest(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 flex items-center gap-1.5
                        ${isSelected 
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/20' 
                          : 'bg-[#0F172A] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bölüm 2: Uzmanlık Durumu */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Yetkinlik Beyanı <span className="text-slate-500 font-normal text-xs">(Opsiyonel)</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {expertiseLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setExpertise(level.id)}
                    className={`text-left p-3 rounded-xl border transition-all duration-200 group
                      ${expertise === level.id 
                        ? 'bg-emerald-600/10 border-emerald-500/50 ring-1 ring-emerald-500/30' 
                        : 'bg-[#0F172A] border-slate-700 hover:border-slate-600'}`}
                  >
                    <div className={`text-sm font-semibold mb-0.5 ${expertise === level.id ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {level.label}
                    </div>
                    <div className="text-[10px] text-slate-500">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Alt Butonlar */}
            <div className="flex gap-3 pt-4 border-t border-slate-700/50">
              <button className="px-4 py-3 rounded-lg text-slate-400 hover:text-white font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" /> Geri
              </button>
              
              <button 
                disabled={selectedInterests.length === 0}
                className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm
                  ${selectedInterests.length > 0 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/30 cursor-pointer' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
              >
                Kaydı Tamamla
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpStep4;