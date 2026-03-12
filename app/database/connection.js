const { Pool } = require('pg');
require('dotenv').config();

// Cria o pool de conexões com parâmetros do .env
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20,             // número máximo de conexões no pool
    idleTimeoutMillis: 30000,  // tempo antes de liberar conexão ociosa
    connectionTimeoutMillis: 2000 // tempo máximo para conectar
});

// Função para testar a conexão ao iniciar a aplicação
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log("✅ Conectado ao PostgreSQL com sucesso!");
        client.release(); // libera a conexão de volta ao pool
    } catch (err) {
        console.error("❌ Erro ao conectar no PostgreSQL:", err.message);
        process.exit(1); // encerra a aplicação caso não consiga conectar
    }
}

// Testa a conexão imediatamente
testConnection();

module.exports = pool;