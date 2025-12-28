"use client";

import React, { useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node
} from 'reactflow';
import 'reactflow/dist/style.css'; // Harita stilleri

// Başlangıç Düğümleri (Konular)
const initialNodes: Node[] = [
  { 
    id: '1', 
    position: { x: 250, y: 0 }, 
    data: { label: 'TOPLUMSAL ETİK' },
    style: { background: '#1E293B', color: '#fff', border: '1px solid #3B82F6', width: 180, borderRadius: '10px', fontWeight: 'bold' }
  },
  { 
    id: '2', 
    position: { x: 100, y: 150 }, 
    data: { label: 'Yapay Zeka Hakları' },
    style: { background: '#0F172A', color: '#94A3B8', border: '1px solid #475569', width: 150, borderRadius: '50px' }
  },
  { 
    id: '3', 
    position: { x: 400, y: 150 }, 
    data: { label: 'Gelir Adaleti' },
    style: { background: '#0F172A', color: '#94A3B8', border: '1px solid #475569', width: 150, borderRadius: '50px' }
  },
  { 
    id: '4', 
    position: { x: 250, y: 300 }, 
    data: { label: 'Evrensel Temel Gelir' },
    style: { background: '#1E293B', color: '#fff', border: '2px solid #10B981', width: 160, borderRadius: '10px' } // Yeşil (Aktif Tartışma)
  },
];

// Bağlantılar (Hangi konu hangisine bağlı)
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#475569' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#475569' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } }, // Yeşil bağlantı
];

const DiscoveryMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Bağlantı kurulduğunda (Gelecekte kullanıcılar kendi bağlarını kurabilir)
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="h-screen w-full bg-[#020617] text-white font-sans">
      
      {/* Üst Bilgi Çubuğu (Overlay) */}
      <div className="absolute top-5 left-8 z-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-2xl">
        <h1 className="text-xl font-bold text-blue-400 flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          Keşif Haritası
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Aktif tartışmalara katılmak için düğümlere tıklayın.
        </p>
      </div>

      {/* Harita Motoru */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={0.5}
        maxZoom={2}
      >
        {/* Arka Plan Izgarası */}
        <Background color="#334155" gap={20} size={1} />
        
        {/* Kontroller (Zoom, Fit) */}
        <Controls className="bg-slate-800 border-slate-700 fill-white" />
        
        {/* Sağ Alttaki Küçük Harita */}
        <MiniMap 
          nodeColor={(node) => {
            return node.style?.background?.toString() || '#fff';
          }}
          className="bg-slate-900 border-slate-700"
          maskColor="rgba(15, 23, 42, 0.6)"
        />
      </ReactFlow>
    </div>
  );
};

export default DiscoveryMap;