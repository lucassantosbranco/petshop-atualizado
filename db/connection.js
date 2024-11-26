const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Insira sua senha do MySQL aqui
  multipleStatements: true
});

// Carregar e executar o script SQL (schema.sql)
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

connection.query(schema, (err) => {
  if (err) {
    console.error('Erro ao executar o script SQL:', err);
  } else {
    console.log('Banco de dados e tabelas configurados com sucesso!');
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL!');
  }
});

module.exports = connection;
