CREATE DATABASE sistema_musica;
USE sistema_musica;

CREATE TABLE artistas (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
genero VARCHAR(50) NOT NULL,
pais VARCHAR(50) NOT NULL
);

CREATE TABLE albuns (
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100) NOT NULL,
ano_lancamento INT NOT NULL,
artista_id INT NOT NULL,
FOREIGN KEY (artista_id) REFERENCES artistas(id)
);

CREATE TABLE musicas (
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100) NOT NULL,
duracao VARCHAR(10) NOT NULL,
album_id INT NOT NULL,
FOREIGN KEY (album_id) REFERENCES albuns(id)
);

INSERT INTO artistas (nome, genero, pais) VALUES
('Anitta', 'Pop', 'Brasil'),
('Coldplay', 'Rock Alternativo', 'Reino Unido'),
('Drake', 'Hip Hop', 'Canadá');

INSERT INTO albuns (titulo, ano_lancamento, artista_id) VALUES
('Versions of Me', 2022, 1),
('Music of the Spheres', 2021, 2),
('Certified Lover Boy', 2021, 3);

INSERT INTO musicas (titulo, duracao, album_id) VALUES
('Envolver', '3:13', 1),
('Girl from Rio', '3:14', 1),
('Higher Power', '3:31', 2),
('My Universe', '3:48', 2),
('Way 2 Sexy', '4:17', 3),
('Girls Want Girls', '3:42', 3);

SELECT * FROM artistas;
SELECT * FROM albuns;
SELECT * FROM musicas;
