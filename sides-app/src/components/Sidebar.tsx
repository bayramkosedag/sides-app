"use client";

import React from 'react';
import { LayoutDashboard, Network, User, Bell, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onLogout: () => void; // <-- Yeni emir
}

const Sidebar = ({ activePage, setActivePage, onLogout }: SidebarProps) => {
  const menuItems = [
    { id: 'map', label: 'Keşif Haritası', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'room', label: 'Tartışma Odası', icon: <Network className="w-5 h-5" /> },
    { id: 'profile', label: 'Profilim', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', label: 'Bildirimler', icon: <Bell className="w-5 h-5" />, badge: 3 },
  ];

  return (
    <div className="hidden md:flex w-64 h-screen bg-[#020617] border-r border-slate-800 flex-col shrink-0">
      
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rotate-45 rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
           <div className="w-4 h-4 bg-white/20 rotate-45" />
        </div>
        <span className="text-xl font-bold text-white tracking-wide">Sides</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
              ${activePage === item.id 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-900/10' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.badge && (<span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>)}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <button 
          onClick={() => setActivePage('settings')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
             ${activePage === 'settings' ? 'text-blue-400 bg-blue-600/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Ayarlar</span>
        </button>

        {/* ÇIKIŞ BUTONU BAĞLANDI */}
        <button 
          onClick={onLogout} 
          className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-900/10 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Çıkış Yap</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;