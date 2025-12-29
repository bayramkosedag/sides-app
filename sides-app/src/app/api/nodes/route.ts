import { NextResponse } from 'next/server';
import { read, write } from '../../../lib/neo4j';

// 1. OKUMA (GET): Verileri çekip haritaya yollar
export async function GET() {
  try {
    const result = await read(`
      MATCH (n:Argument) 
      OPTIONAL MATCH (n)-[r]->(m)
      RETURN n, r, m
    `);

    // Node'ları (Kutuları) Hazırla
    const nodes = result.map((row: any) => {
      const n = row.n.properties;
      return {
        id: n.id,
        position: { x: n.x, y: n.y },
        data: { label: n.label },
        type: 'default',
        style: n.type === 'thesis' 
          ? { background: '#1E293B', color: '#fff', border: '2px solid #3B82F6', width: 250, padding: '20px', borderRadius: '12px', fontWeight: 'bold' } 
          : n.type === 'pro'
          ? { background: '#0F172A', color: '#e2e8f0', border: '2px solid #10B981', borderRadius: '8px', padding: '15px', width: 200, fontSize: '14px' }
          : { background: '#0F172A', color: '#e2e8f0', border: '2px solid #EF4444', borderRadius: '8px', padding: '15px', width: 200, fontSize: '14px' }
      };
    });

    // Edge'leri (Çizgileri) Hazırla
    // Not: Şu an basitlik olsun diye veritabanından çizgi çekmiyoruz,
    // yeni eklenenleri otomatik ana teze bağlayacağız.
    
    // Benzersiz node'ları filtrele (Çift kayıt olmasın)
    const uniqueNodes = Array.from(new Map(nodes.map((item:any) => [item.id, item])).values());

    return NextResponse.json({ nodes: uniqueNodes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. YAZMA (POST): Yeni argümanı veritabanına kaydeder
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Gelen veriyi oku
    const { text, type, x, y } = body;

    // Rastgele ID oluştur
    const newId = `node-${Math.random().toString(36).substr(2, 9)}`;

    // Veritabanına yaz (Cypher Query)
    await write(`
      CREATE (n:Argument {
        id: $id,
        label: $label,
        type: $type,
        x: $x,
        y: $y
      })
      RETURN n
    `, {
      id: newId,
      label: text,
      type: type,
      x: x,
      y: y
    });

    return NextResponse.json({ success: true, id: newId });
  } catch (error: any) {
    console.error("Kayıt hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}