"use client";

import React from 'react';
import { User, Award, TrendingUp, AlertCircle, CheckCircle2, Shield, Calendar, MapPin, Settings, LogOut } from 'lucide-react';

// DÜZELTME: Hem onNavigate hem de onLogout'u kabul ediyoruz
interface UserProfileProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void; // <-- Bu satırı eklememiş olabiliriz
}

const UserProfile = ({ onNavigate, onLogout }: UserProfileProps) => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans pb-20 md:pb-0">
      
      {/* Üst Banner */}
      <div className="h-40 md:h-48 bg-gradient-to-r from-blue-900 to-slate-900 border-b border-slate-800 relative">
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
        
        {/* MOBİL İÇİN SAĞ ÜST BUTONLAR */}
        <div className="absolute top-4 right-4 flex gap-2 md:hidden">
            {/* Ayarlar Butonu */}
            <button 
                onClick={() => onNavigate && onNavigate('settings')}
                className="p-2 bg-slate-800/50 backdrop-blur text-white rounded-full border border-slate-700"
            >
                <Settings className="w-5 h-5" />
            </button>
            
            {/* Çıkış Butonu (DÜZELTME: onClick bağlandı) */}
            <button 
                onClick={onLogout}
                className="p-2 bg-rose-900/50 backdrop-blur text-rose-200 rounded-full border border-rose-800"
            >
                <LogOut className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-16 md:-mt-20 relative z-10">
        
        {/* Kullanıcı Başlık Kartı */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 mb-8 md:mb-12 text-center md:text-left">
          
          <div className="w-28 h-28 md:w-32 md:h-32 bg-[#1E293B] rounded-2xl border-4 border-[#0F172A] flex items-center justify-center shadow-2xl shrink-0">
            <User className="w-12 h-12 md:w-16 md:h-16 text-slate-500" />
          </div>

          <div className="flex-1 pb-2 w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-2 justify-center md:justify-start">
              <h1 className="text-2xl md:text-3xl font-bold text-white">LogicSeeker_99</h1>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30 uppercase tracking-wide">
                Müptedi (Lvl 3)
              </span>
            </div>
            <p className="text-slate-400 text-sm flex flex-wrap justify-center md:justify-start items-center gap-4">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Hukuk & Etik</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Üyelik: Ara 2025</span>
            </p>

            {/* MASAÜSTÜ İÇİN BUTONLAR */}
            <div className="hidden md:flex gap-3 mt-4">
                <button 
                    onClick={() => onNavigate && onNavigate('settings')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <Settings className="w-4 h-4" /> Profili Düzenle
                </button>
            </div>
          </div>

          <div className="bg-[#1E293B] p-3 md:p-4 rounded-xl border border-slate-700 shadow-lg text-center w-full md:w-auto min-w-[150px]">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">İtimat Skoru</span>
            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mt-1">720</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" /> %4 Artış
            </div>
          </div>
        </div>

        {/* İstatistikler (Değişmedi) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          <StatCard icon={<CheckCircle2 className="w-5 h-5 text-blue-400" />} label="Kazanılan" value="14" desc="Argüman" />
          <StatCard icon={<Shield className="w-5 h-5 text-amber-400" />} label="Teslimiyet" value="3" desc="Doğruyu kabul" highlight />
          <StatCard icon={<AlertCircle className="w-5 h-5 text-rose-400" />} label="Safsata" value="2" desc="Uyarı sayısı" />
          <StatCard icon={<Award className="w-5 h-5 text-purple-400" />} label="Rozetler" value="5" desc="Koleksiyon" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-4">Son Aktiviteler</h3>
            <ActivityItem type="win" title="Yapay Zeka Telif Hakları Tartışması" desc="Argümanınız 'Saman Adam' testini başarıyla geçti ve ana ağaca eklendi." time="2 saat önce" />
            <ActivityItem type="surrender" title="Evrensel Temel Gelir" desc="Karşı tarafın sunduğu veriyi kabul ederek 'Teslimiyet' puanı kazandınız." time="1 gün önce" />
             <ActivityItem type="post" title="Toplu Taşımada Nezaket" desc="Yeni bir antitez oluşturdunuz: 'Ses kirliliği özgürlük değildir'." time="3 gün önce" />
          </div>
          <div className="space-y-6">
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-4 md:p-6">
              <h3 className="font-bold text-white mb-4">Kazanılan Rozetler</h3>
              <div className="grid grid-cols-3 gap-4">
                <Badge color="bg-emerald-500" name="Hakikat" />
                <Badge color="bg-blue-500" name="Mantık" />
                <Badge color="bg-amber-500" name="Kaşif" />
                <Badge color="bg-purple-500" name="Bilge" opacity />
                <Badge color="bg-slate-600" name="???" opacity />
                <Badge color="bg-slate-600" name="???" opacity />
              </div>
            </div>
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-4 md:p-6 mb-6">
              <h3 className="font-bold text-white mb-4">Mantık Yetkinliği</h3>
              <SkillBar name="Analitik Düşünme" percent="85%" />
              <SkillBar name="Safsata Tespiti" percent="60%" />
              <SkillBar name="Nezaket" percent="92%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alt bileşenler
const StatCard = ({ icon, label, value, desc, highlight }: any) => (
  <div className={`p-3 md:p-5 rounded-xl border flex flex-col justify-between h-28 md:h-32 transition-all hover:scale-[1.02] ${highlight ? 'bg-blue-900/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-[#1E293B] border-slate-700/50'}`}>
    <div className="flex justify-between items-start"><div className="p-1.5 md:p-2 bg-[#0F172A] rounded-lg border border-slate-700">{icon}</div><span className="text-xl md:text-2xl font-bold text-white">{value}</span></div>
    <div><div className={`text-xs md:text-sm font-semibold ${highlight ? 'text-blue-200' : 'text-slate-300'}`}>{label}</div><div className="text-[10px] md:text-xs text-slate-500 truncate">{desc}</div></div>
  </div>
);
const ActivityItem = ({ type, title, desc, time }: any) => {
  let borderColor = "border-slate-700", icon = <CheckCircle2 className="w-5 h-5 text-slate-500" />;
  if (type === 'win') { borderColor = "border-emerald-500/50"; icon = <Award className="w-5 h-5 text-emerald-400" />; } 
  else if (type === 'surrender') { borderColor = "border-amber-500/50"; icon = <Shield className="w-5 h-5 text-amber-400" />; }
  return (
    <div className={`p-4 md:p-5 rounded-xl bg-[#1E293B] border ${borderColor} relative group overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${type === 'win' ? 'bg-emerald-500' : type === 'surrender' ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
      <div className="flex gap-3 md:gap-4"><div className="mt-1 shrink-0">{icon}</div><div><h4 className="font-bold text-sm md:text-base text-slate-200 group-hover:text-white transition-colors">{title}</h4><p className="text-xs md:text-sm text-slate-400 mt-1 mb-2 leading-relaxed">{desc}</p><span className="text-[10px] md:text-xs text-slate-600 font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> {time}</span></div></div>
    </div>
  );
};
const Badge = ({ color, name, opacity }: any) => (<div className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 p-2 ${opacity ? 'opacity-30 grayscale' : 'bg-slate-800 border border-slate-700'}`}><div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${color} shadow-lg`}></div><span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">{name}</span></div>);
const SkillBar = ({ name, percent }: any) => (<div className="mb-4 last:mb-0"><div className="flex justify-between text-xs mb-1"><span className="text-slate-300">{name}</span><span className="text-slate-500">{percent}</span></div><div className="h-2 bg-[#0F172A] rounded-full overflow-hidden"><div className="h-full bg-blue-600" style={{ width: percent }}></div></div></div>);

export default UserProfile;