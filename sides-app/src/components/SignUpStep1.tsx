"use client";

import React, { useState } from 'react';
import { Eye, MessageSquare, AtSign, Mail, Lock, ArrowRight } from 'lucide-react';

const SignUpStep1 = () => {
  const [userType, setUserType] = useState<'observer' | 'debater'>('debater');

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
        <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Yardım</a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center py-6 px-4">
        <div className="w-full max-w-2xl">
          
          {/* İlerleme Çubuğu */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-500 font-medium">Adım 1/4</span>
              <span className="text-slate-500">Sıradaki: Logos Pledge</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div className="h-full w-1/4 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
              <div className="h-full w-1/4 border-l border-slate-900 bg-slate-800/50"></div>
              <div className="h-full w-1/4 border-l border-slate-900 bg-slate-800/50"></div>
              <div className="h-full w-1/4 border-l border-slate-900 bg-slate-800/50"></div>
            </div>
          </div>

          {/* Form Kartı */}
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-6 shadow-2xl shadow-black/50">
            
            <h1 className="text-2xl font-bold text-white mb-1">Hesabını Oluştur</h1>
            <p className="text-slate-400 text-sm mb-6">Akılcı tartışmaların dünyasına hoş geldin.</p>

            {/* Kimlik Seçimi */}
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  onClick={() => setUserType('observer')}
                  className={`flex flex-col p-3 rounded-xl border text-left transition-all duration-200 group
                    ${userType === 'observer' 
                      ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500/50' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className={`w-4 h-4 ${userType === 'observer' ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className={`font-semibold text-sm ${userType === 'observer' ? 'text-white' : 'text-slate-200'}`}>Gözlemci</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">İzle, oyla ve öğren. İçerik üretimi kapalıdır.</p>
                </button>

                <button 
                  onClick={() => setUserType('debater')}
                  className={`flex flex-col p-3 rounded-xl border text-left transition-all duration-200 group
                    ${userType === 'debater' 
                      ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500/50' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className={`w-4 h-4 ${userType === 'debater' ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className={`font-semibold text-sm ${userType === 'debater' ? 'text-white' : 'text-slate-200'}`}>Tartışmacı</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">Fikirlerini savun, tezler sun ve etkileşime gir.</p>
                </button>
              </div>
            </div>

            {/* Form Alanları */}
            <div className="space-y-3">
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-white ml-1">Kullanıcı Adı</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input type="text" placeholder="kullaniciadi" className="block w-full pl-9 pr-3 py-2.5 text-sm bg-[#0F172A] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white ml-1">E-posta Adresi</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input type="email" placeholder="ornek@email.com" className="block w-full pl-9 pr-3 py-2.5 text-sm bg-[#0F172A] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white ml-1">Şifre</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input type="password" placeholder="••••••••" className="block w-full pl-9 pr-3 py-2.5 text-sm bg-[#0F172A] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">En az 8 karakter, bir büyük harf ve sembol.</p>
              </div>

            </div>

            {/* Buton */}
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] flex items-center justify-center gap-2 group">
              Devam Et
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-4 text-center pb-4">
            <p className="text-slate-400 text-xs">
              Zaten bir hesabın var mı?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Giriş Yap</a>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SignUpStep1;