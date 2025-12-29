import neo4j from 'neo4j-driver';

// Şifreleri doğrudan buraya yazıyoruz (Test için)
const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = '12345678'; 

const driver = neo4j.driver(
  uri, 
  neo4j.auth.basic(user, password),
  { 
    disableLosslessIntegers: true,
    // Yerel (Docker) bağlantılarda şifreleme sorun çıkarabilir, kapatalım:
    encrypted: "ENCRYPTION_OFF" 
  }
);

export async function read(cypher: string, params = {}) {
  const session = driver.session();
  try {
    const res = await session.executeRead(tx => tx.run(cypher, params));
    return res.records.map(record => record.toObject());
  } catch (error) {
    console.error("VERİTABANI OKUMA HATASI:", error);
    throw error;
  } finally {
    await session.close();
  }
}

export async function write(cypher: string, params = {}) {
  const session = driver.session();
  try {
    const res = await session.executeWrite(tx => tx.run(cypher, params));
    return res.records.map(record => record.toObject());
  } catch (error) {
    console.error("VERİTABANI YAZMA HATASI:", error);
    throw error;
  } finally {
    await session.close();
  }
}

export default driver;