"use client";

import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, ShieldAlert, MessageSquare, Trash2, Check, ArrowRight } from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState<'all' | 'alerts' | 'success'>('all');

  // Sahte Bildirim Verileri
  const notifications = [
    {
      id: 1,
      type: 'refutation', // Çürütülme (Kırmızı)
      title: 'Teziniz Çürütüldü',
      message: '"Enflasyon-Faiz" ilişkinizdeki nedensellik bağı, "LogicMaster_01" tarafından sunulan veriyle geçersiz kılındı.',
      time: '15 dk önce',
      read: false
    },
    {
      id: 2,
      type: 'success', // Başarı (Yeşil)
      title: 'Teslimiyet Kazanıldı',
      message: 'Tebrikler! "AhmetYilmaz" sunduğunuz kanıt karşısında haksız olduğunu kabul etti. (+50 İtimat Puanı)',
      time: '2 saat önce',
      read: false
    },
    {
      id: 3,
      type: 'system', // Sistem (Mavi)
      title: 'Safsata Denetimi Tamamlandı',
      message: 'Son argümanınız yapay zeka tarafından tarandı ve temiz bulundu. Tartışma ağacına eklendi.',
      time: '5 saat önce',
      read: true
    },
    {
      id: 4,
      type: 'warning', // Uyarı (Sarı)
      title: 'İtibar Uyarısı',
      message: 'Son 3 tartışmada "Ad Hominem" (Kişiliğe Saldırı) tespit edildi. Lütfen üslubunuza dikkat ediniz.',
      time: '1 gün önce',
      read: true
    },
    {
      id: 5,
      type: 'reply', // Cevap (Gri)
      title: 'Yeni Karşıt Görüş',
      message: 'Asgari ücret konulu tezinize yeni bir antitez eklendi.',
      time: '1 gün önce',
      read: true
    }
  ];

  // Filtreleme Mantığı
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'alerts') return n.type === 'warning' || n.type === 'refutation';
    if (filter === 'success') return n.type === 'success' || n.type === 'system';
    return true;
  });

  return (
    <div className="h-full bg-[#0F172A] text-slate-300 font-sans flex flex-col">
      
      {/* Üst Başlık */}
      <div className="p-8 border-b border-slate-800 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bildirim Merkezi</h1>
          <p className="text-slate-400 text-sm">Platformdaki etkileşimleriniz ve sistem uyarıları.</p>
        </div>
        <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
          <Check className="w-3 h-3" /> Tümünü Okundu İşaretle
        </button>
      </div>

      {/* Filtre Butonları */}
      <div className="px-8 py-4 flex gap-4 border-b border-slate-800/50">
        <FilterButton label="Tümü" active={filter === 'all'} onClick={() => setFilter('all')} count={5} />
        <FilterButton label="Uyarılar & Risk" active={filter === 'alerts'} onClick={() => setFilter('alerts')} count={2} />
        <FilterButton label="Başarılar" active={filter === 'success'} onClick={() => setFilter('success')} count={2} />
      </div>

      {/* Liste Alanı */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-4xl space-y-4">
          
          {filteredNotifications.map((notif) => (
            <div 
              key={notif.id}
              className={`p-5 rounded-xl border transition-all duration-200 flex gap-4 relative group
                ${!notif.read ? 'bg-[#1E293B] border-slate-700' : 'bg-[#0F172A] border-slate-800 opacity-70 hover:opacity-100'}
              `}
            >
              {/* Sol İkon (Türe Göre Değişir) */}
              <div className="mt-1 shrink-0">
                {notif.type === 'refutation' && <div className="p-2 bg-rose-500/20 text-rose-500 rounded-lg"><ShieldAlert className="w-5 h-5" /></div>}
                {notif.type === 'success' && <div className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>}
                {notif.type === 'warning' && <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg"><AlertTriangle className="w-5 h-5" /></div>}
                {notif.type === 'system' && <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Bell className="w-5 h-5" /></div>}
                {notif.type === 'reply' && <div className="p-2 bg-slate-700/50 text-slate-400 rounded-lg"><MessageSquare className="w-5 h-5" /></div>}
              </div>

              {/* İçerik */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm font-bold mb-1 ${!notif.read ? 'text-white' : 'text-slate-400'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-xs text-slate-500">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{notif.message}</p>
                
                {/* Aksiyon Butonu (Sadece bazı tiplerde) */}
                {notif.type === 'refutation' && (
                  <button className="mt-3 text-xs font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1">
                    Cevap Hakkını Kullan <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Okunmadı Noktası */}
              {!notif.read && (
                <div className="absolute top-6 right-6 w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
              
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

// Alt Bileşen: Filtre Butonu
const FilterButton = ({ label, active, onClick, count }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2
      ${active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
  >
    {label}
    {count && <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/20' : 'bg-slate-700'}`}>{count}</span>}
  </button>
);

export default Notifications;