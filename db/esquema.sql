
CREATE DATABASE IF NOT EXISTS petshop;
USE petshop;


CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS animais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT,
    tipo VARCHAR(50),
    dono_id INT,
    FOREIGN KEY (dono_id) REFERENCES clientes(id) ON DELETE CASCADE
);
