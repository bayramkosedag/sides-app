"use client";

import React, { useCallback, useState } from 'react'; // useState eklendi
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
import { AlertTriangle, CheckCircle, XCircle, BarChart3, ShieldAlert, ChevronRight } from 'lucide-react';
import ArgumentInputModal from './ArgumentInputModal'; // Modal dosyasını içeri aldık

// --- ÖZEL DÜĞÜM STİLLERİ ---

// Ana Tez (Başlangıç)
const thesisStyle = {
  background: '#1E293B',
  color: '#fff',
  border: '2px solid #3B82F6', // Mavi
  borderRadius: '12px',
  padding: '20px',
  width: 250,
  fontSize: '16px',
  fontWeight: 'bold',
  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
};

// Destekleyen Argüman (Pro)
const proStyle = {
  background: '#0F172A',
  color: '#e2e8f0',
  border: '2px solid #10B981', // Yeşil
  borderRadius: '8px',
  padding: '15px',
  width: 200,
  fontSize: '14px'
};

// Karşıt Argüman (Con)
const conStyle = {
  background: '#0F172A',
  color: '#e2e8f0',
  border: '2px solid #EF4444', // Kırmızı
  borderRadius: '8px',
  padding: '15px',
  width: 200,
  fontSize: '14px'
};

// --- VERİLER ---

const initialNodes: Node[] = [
  // Ana Tez
  { id: 'root', position: { x: 400, y: 50 }, data: { label: 'Asgari Ücret 30.000 TL Olmalı' }, style: thesisStyle },
  
  // Seviye 1
  { id: 'pro-1', position: { x: 150, y: 250 }, data: { label: 'Mevcut ücret açlık sınırının altında.' }, style: proStyle },
  { id: 'con-1', position: { x: 650, y: 250 }, data: { label: 'Bu artış hiperenflasyonu tetikler.' }, style: conStyle },

  // Seviye 2 (Karşıtın cevabı)
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal aç/kapa durumu

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-300 font-sans overflow-hidden">
      
      {/* SOL TARAFI: Tartışma Ağacı */}
      <div className="flex-1 relative border-r border-slate-800">
        
        {/* Üst Bilgi */}
        <div className="absolute top-5 left-8 z-10">
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-2">
            <ChevronRight className="w-4 h-4 rotate-180" /> Haritaya Dön
          </button>
          <h2 className="text-2xl font-bold text-white">Ekonomi Tartışmaları #4291</h2>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#1e293b" gap={25} size={1} />
          <Controls className="bg-slate-800 border-slate-700 fill-white" />
        </ReactFlow>
      </div>

      {/* SAĞ TARAF: Analiz ve Denetçi Paneli */}
      <div className="w-96 bg-[#0F172A] flex flex-col h-full shadow-2xl">
        
        {/* Başlık */}
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-500" />
            Safsata Denetçisi
          </h3>
          <p className="text-xs text-slate-400 mt-1">Yapay zeka bu tartışmayı canlı izliyor.</p>
        </div>

        {/* Canlı Analiz Akışı */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Uyarı Kartı */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-amber-200">Olası Safsata Tespit Edildi</h4>
                <p className="text-xs text-slate-400 mt-1">
                  "KOBİ'ler batar" argümanında <span className="text-white font-medium">Korkuya Başvurma</span> safsatası olabilir. Veri ile desteklenmeli.
                </p>
              </div>
            </div>
            <button className="mt-3 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 px-3 py-1.5 rounded transition-colors w-full">
              Kanıt Talep Et
            </button>
          </div>

          {/* Onay Kartı */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-emerald-200">Güçlü Argüman</h4>
                <p className="text-xs text-slate-400 mt-1">
                  "Açlık sınırı" verisi TÜİK raporuyla doğrulandı.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Alt İstatistikler */}
        <div className="p-6 bg-[#020617] border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-400">Tartışma Sağlığı</span>
            <span className="text-sm font-bold text-emerald-400">%78</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[78%] bg-emerald-500"></div>
          </div>
          
          {/* BUTON GÜNCELLENDİ: ARTIK MODAL AÇIYOR */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            <BarChart3 className="w-4 h-4" />
            Argümana Katıl
          </button>
        </div>

      </div>

      {/* MODAL BİLEŞENİ SAYFAYA EKLENDİ */}
      <ArgumentInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
};

export default ArgumentRoom;