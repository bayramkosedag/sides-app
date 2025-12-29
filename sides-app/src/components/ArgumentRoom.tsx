"use client";

import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { AlertTriangle, BarChart3, ShieldAlert, ChevronRight } from 'lucide-react';
import ArgumentInputModal from './ArgumentInputModal';

const ArgumentRoom = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Verileri veritabanından çeken fonksiyon
  const fetchArguments = async () => {
    try {
      const res = await fetch('/api/nodes');
      const data = await res.json();
      
      if (data.nodes) {
        setNodes(data.nodes);
        
        // Gelen her kutuyu otomatik olarak "root"a bağlayalım (Görsel çizgi)
        // Gerçek projede bu ilişkiler de veritabanından gelir.
        const automatedEdges = data.nodes
          .filter((n: any) => n.id !== 'root')
          .map((n: any) => ({
            id: `e-${n.id}`,
            source: 'root',
            target: n.id,
            animated: true,
            style: { stroke: n.style.border.includes('#10B981') ? '#10B981' : '#EF4444' }
          }));
        setEdges(automatedEdges);
      }
    } catch (error) {
      console.error("Veri hatası:", error);
    }
  };

  // Sayfa açılınca verileri çek
  useEffect(() => {
    fetchArguments();
  }, []);

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // YENİ: Argümanı Veritabanına Kaydetme
  const handleAddArgument = async (text: string, type: 'pro' | 'con') => {
    // Rastgele konum belirle
    const randomX = 200 + Math.random() * 400;
    const randomY = 200 + Math.random() * 200;

    try {
      // 1. API'ye gönder (POST isteği)
      const res = await fetch('/api/nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type, x: randomX, y: randomY })
      });

      if (res.ok) {
        // 2. Başarılıysa listeyi yenile (Veritabanından taze halini çek)
        fetchArguments();
      } else {
        alert("Kaydederken bir hata oluştu!");
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-[#020617] text-slate-300 font-sans overflow-hidden">
      
      <div className="flex-1 relative border-r border-slate-800 h-[55%] md:h-full">
        <div className="absolute top-5 left-8 z-10 pointer-events-none">
          <button className="flex items-center gap-2 text-sm text-slate-400 pointer-events-auto mb-2"><ChevronRight className="w-4 h-4 rotate-180" /> Haritaya Dön</button>
          <h2 className="text-xl md:text-2xl font-bold text-white shadow-black drop-shadow-md">Ekonomi Tartışmaları</h2>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="bg-[#020617]"
        >
          <Background color="#1e293b" gap={25} size={1} />
          <Controls className="bg-slate-800 border-slate-700 fill-white mb-12 md:mb-0" />
        </ReactFlow>
      </div>

      <div className="w-full md:w-96 h-[45%] md:h-full bg-[#0F172A] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t md:border-t-0 md:border-l border-slate-800 z-20">
        <div className="p-4 md:p-6 border-b border-slate-800 shrink-0">
          <h3 className="text-sm md:text-lg font-bold text-white flex items-center gap-2"><ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-blue-500" /> Safsata Denetçisi</h3>
          <p className="text-[10px] md:text-xs text-slate-400 mt-1">Yapay zeka bu tartışmayı canlı izliyor.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 custom-scrollbar">
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 md:p-4 rounded-lg">
             <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-500 shrink-0 mt-0.5" />
              <div><h4 className="text-xs md:text-sm font-semibold text-amber-200">Bilgi</h4><p className="text-[10px] md:text-xs text-slate-400 mt-1">Eklediğiniz argümanlar artık veritabanına kaydediliyor.</p></div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-[#020617] border-t border-slate-800 shrink-0 pb-20 md:pb-6"> 
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 md:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
          >
            <BarChart3 className="w-4 h-4" /> Argümana Katıl
          </button>
        </div>
      </div>

      <ArgumentInputModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddArgument} 
      />

    </div>
  );
};

export default ArgumentRoom;