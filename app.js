
const express = require('express');
const cors = require('cors');
const db = require('./db/connection');

const app = express();
const PORT = 3000;

app.get('/api/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/clientes', (req, res) => {
  const { nome, telefone, endereco } = req.body;
  db.query('INSERT INTO clientes (nome, telefone, endereco) VALUES (?, ?, ?)', [nome, telefone, endereco], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nome, telefone, endereco });
  });
});

app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, endereco } = req.body;
  db.query('UPDATE clientes SET nome = ?, telefone = ?, endereco = ? WHERE id = ?', [nome, telefone, endereco, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Cliente atualizado com sucesso!' });
  });
});

app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Cliente removido com sucesso!' });
  });
});

app.get('/api/animais', (req, res) => {
  db.query('SELECT animais.*, clientes.nome AS dono FROM animais JOIN clientes ON animais.dono_id = clientes.id', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/animais', (req, res) => {
  const { nome, idade, tipo, dono_id } = req.body;
  db.query('INSERT INTO animais (nome, idade, tipo, dono_id) VALUES (?, ?, ?, ?)', [nome, idade, tipo, dono_id], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nome, idade, tipo, dono_id });
  });
});

app.put('/api/animais/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade, tipo, dono_id } = req.body;
  db.query('UPDATE animais SET nome = ?, idade = ?, tipo = ?, dono_id = ? WHERE id = ?', [nome, idade, tipo, dono_id, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Animal atualizado com sucesso!' });
  });
});

app.delete('/api/animais/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM animais WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Animal removido com sucesso!' });
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
