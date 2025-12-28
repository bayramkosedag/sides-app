"use client";

import React from 'react';
import { ArrowLeft, User, Lock, Bell, Moon, LogOut, Trash2, Save } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-slate-800 sticky top-0 bg-[#0F172A]/90 backdrop-blur z-30">
        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Ayarlar</h1>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-8">
        
        {/* Bölüm 1: Hesap Bilgileri */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-4 h-4" /> Hesap Bilgileri
          </h2>
          <div className="bg-[#1E293B] rounded-xl border border-slate-700 p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Kullanıcı Adı</label>
                <input type="text" defaultValue="LogicSeeker_99" className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">E-posta</label>
                <input type="email" defaultValue="ornek@email.com" className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Biyografi</label>
              <textarea defaultValue="Hukuk öğrencisi ve mantık tutkunu." className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-24 resize-none" />
            </div>
            <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Save className="w-4 h-4" /> Kaydet
                </button>
            </div>
          </div>
        </section>

        {/* Bölüm 2: Güvenlik */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Güvenlik
          </h2>
          <div className="bg-[#1E293B] rounded-xl border border-slate-700 p-6 space-y-4">
            <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Mevcut Şifre</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Yeni Şifre</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Yeni Şifre (Tekrar)</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="flex justify-end">
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Şifreyi Güncelle
                </button>
            </div>
          </div>
        </section>

        {/* Bölüm 3: Tercihler */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4" /> Tercihler
          </h2>
          <div className="bg-[#1E293B] rounded-xl border border-slate-700 p-6 space-y-4">
             <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg"><Moon className="w-4 h-4 text-purple-400" /></div>
                    <span className="text-sm font-medium">Karanlık Mod</span>
                </div>
                <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
             </div>
             <div className="flex items-center justify-between p-2 border-t border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg"><Bell className="w-4 h-4 text-emerald-400" /></div>
                    <span className="text-sm font-medium">E-posta Bildirimleri</span>
                </div>
                <div className="w-10 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
             </div>
          </div>
        </section>

        {/* Bölüm 4: Tehlike Bölgesi */}
        <section>
          <h2 className="text-sm font-bold text-rose-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Tehlike Bölgesi
          </h2>
          <div className="bg-rose-900/10 rounded-xl border border-rose-900/30 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-rose-200 font-bold text-sm">Hesabı Sil</h3>
                    <p className="text-rose-200/60 text-xs mt-1">Bu işlem geri alınamaz. Tüm verileriniz silinir.</p>
                </div>
                <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Hesabı Sil
                </button>
            </div>
          </div>
        </section>
        
        {/* Çıkış Yap Butonu */}
        <div className="pt-4 flex justify-center">
            <button className="text-slate-500 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                <LogOut className="w-4 h-4" /> Oturumu Kapat
            </button>
        </div>

      </div>
    </div>
  );
};
// Icon import hatasını önlemek için AlertCircle'ı burada ekliyoruz
import { AlertCircle } from 'lucide-react';

export default SettingsPage;