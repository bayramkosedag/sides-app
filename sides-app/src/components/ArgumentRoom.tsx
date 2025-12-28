"use client";

import React, { useCallback, useState } from 'react';
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
import { AlertTriangle, CheckCircle, BarChart3, ShieldAlert, ChevronRight } from 'lucide-react';
import ArgumentInputModal from './ArgumentInputModal';

// --- ÖZEL DÜĞÜM STİLLERİ ---

// Ana Tez
const thesisStyle = {
  background: '#1E293B',
  color: '#fff',
  border: '2px solid #3B82F6',
  borderRadius: '12px',
  padding: '20px',
  width: 250,
  fontSize: '16px',
  fontWeight: 'bold',
  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
};

// Destekleyen Argüman
const proStyle = {
  background: '#0F172A',
  color: '#e2e8f0',
  border: '2px solid #10B981',
  borderRadius: '8px',
  padding: '15px',
  width: 200,
  fontSize: '14px'
};

// Karşıt Argüman
const conStyle = {
  background: '#0F172A',
  color: '#e2e8f0',
  border: '2px solid #EF4444',
  borderRadius: '8px',
  padding: '15px',
  width: 200,
  fontSize: '14px'
};

// --- VERİLER ---

const initialNodes: Node[] = [
  { id: 'root', position: { x: 400, y: 50 }, data: { label: 'Asgari Ücret 30.000 TL Olmalı' }, style: thesisStyle },
  { id: 'pro-1', position: { x: 150, y: 250 }, data: { label: 'Mevcut ücret açlık sınırının altında.' }, style: proStyle },
  { id: 'con-1', position: { x: 650, y: 250 }, data: { label: 'Bu artış hiperenflasyonu tetikler.' }, style: conStyle },
  { id: 'pro-2', position: { x: 500, y: 450 }, data: { label: 'Enflasyon ücretle değil, üretimle ilgilidir.' }, style: proStyle },
  { id: 'con-2', position: { x: 800, y: 450 }, data: { label: 'KOBİ\'ler bu yükü kaldıramaz, iflaslar başlar.' }, style: conStyle },
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'root', target: 'pro-1', type: 'smoothstep', animated: true, style: { stroke: '#10B981', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' } },
  { id: 'e2', source: 'root', target: 'con-1', type: 'smoothstep', animated: true, style: { stroke: '#EF4444', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' } },
  { id: 'e3', source: 'con-1', target: 'pro-2', type: 'smoothstep', style: { stroke: '#10B981' } },
  { id: 'e4', source: 'con-1', target: 'con-2', type: 'smoothstep', style: { stroke: '#EF4444' } },
];

const ArgumentRoom = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    // DÜZELTME 1: flex-col (mobil) ve md:flex-row (masaüstü) yapısı
    <div className="flex flex-col md:flex-row h-full bg-[#020617] text-slate-300 font-sans overflow-hidden">
      
      {/* SOL/ÜST TARAFI: Tartışma Ağacı */}
      <div className="flex-1 relative border-r border-slate-800 h-[55%] md:h-full">
        
        {/* Üst Bilgi */}
        <div className="absolute top-5 left-8 z-10 pointer-events-none">
          <button className="flex items-center gap-2 text-sm text-slate-400 pointer-events-auto mb-2">
            <ChevronRight className="w-4 h-4 rotate-180" /> Haritaya Dön
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-white shadow-black drop-shadow-md">Ekonomi Tartışmaları</h2>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          // Mobilde kontrolleri biraz yukarı alalım ki panelin altında kalmasın
          className="bg-[#020617]"
        >
          <Background color="#1e293b" gap={25} size={1} />
          <Controls className="bg-slate-800 border-slate-700 fill-white mb-12 md:mb-0" />
        </ReactFlow>
      </div>

      {/* SAĞ/ALT TARAF: Analiz Paneli */}
      {/* DÜZELTME 2: Mobilde yükseklik %45, Masaüstünde tam boy ve genişlik 96 birim */}
      <div className="w-full md:w-96 h-[45%] md:h-full bg-[#0F172A] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t md:border-t-0 md:border-l border-slate-800 z-20">
        
        {/* Başlık */}
        <div className="p-4 md:p-6 border-b border-slate-800 shrink-0">
          <h3 className="text-sm md:text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            Safsata Denetçisi
          </h3>
          <p className="text-[10px] md:text-xs text-slate-400 mt-1">Yapay zeka bu tartışmayı canlı izliyor.</p>
        </div>

        {/* Canlı Analiz Akışı */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 custom-scrollbar">
          
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 md:p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-amber-200">Olası Safsata</h4>
                <p className="text-[10px] md:text-xs text-slate-400 mt-1">
                  "KOBİ'ler batar" argümanında <span className="text-white font-medium">Korkuya Başvurma</span> tespit edildi.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 md:p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-emerald-200">Güçlü Argüman</h4>
                <p className="text-[10px] md:text-xs text-slate-400 mt-1">
                  Veri, TÜİK raporuyla doğrulandı.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Alt İstatistikler ve Buton */}
        <div className="p-4 md:p-6 bg-[#020617] border-t border-slate-800 shrink-0 pb-20 md:pb-6"> 
          {/* pb-20: Mobilde alt menü (navbar) butonu kapatmasın diye boşluk bırakıldı */}
          
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-xs md:text-sm font-medium text-slate-400">Tartışma Sağlığı</span>
            <span className="text-xs md:text-sm font-bold text-emerald-400">%78</span>
          </div>
          <div className="h-1.5 md:h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
            <div className="h-full w-[78%] bg-emerald-500"></div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 md:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
          >
            <BarChart3 className="w-4 h-4" />
            Argümana Katıl
          </button>
        </div>

      </div>

      <ArgumentInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default ArgumentRoom;