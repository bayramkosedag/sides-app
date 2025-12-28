"use client";

import React from 'react';
import { LayoutDashboard, Network, User, Bell } from 'lucide-react';

interface MobileNavProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const MobileNav = ({ activePage, setActivePage }: MobileNavProps) => {
  const menuItems = [
    { id: 'map', icon: <LayoutDashboard className="w-6 h-6" />, label: 'Harita' },
    { id: 'room', icon: <Network className="w-6 h-6" />, label: 'Tartışma' },
    { id: 'notifications', icon: <Bell className="w-6 h-6" />, label: 'Bildirim' },
    { id: 'profile', icon: <User className="w-6 h-6" />, label: 'Profil' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#020617] border-t border-slate-800 flex justify-around items-center h-16 z-50 px-2 safe-area-pb">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors
            ${activePage === item.id ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
        >
          {item.icon}
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileNav;