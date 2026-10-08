-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           12.3.1-MariaDB - MariaDB Server
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.14.0.7165
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para sistema_musica
CREATE DATABASE IF NOT EXISTS `sistema_musica` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `sistema_musica`;

-- Copiando estrutura para tabela sistema_musica.albuns
CREATE TABLE IF NOT EXISTS `albuns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `ano_lancamento` int(11) NOT NULL,
  `artista_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `artista_id` (`artista_id`),
  CONSTRAINT `1` FOREIGN KEY (`artista_id`) REFERENCES `artistas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela sistema_musica.albuns: ~3 rows (aproximadamente)
INSERT INTO `albuns` (`id`, `titulo`, `ano_lancamento`, `artista_id`) VALUES
	(1, 'Versions of Me', 2022, 1),
	(2, 'Music of the Spheres', 2021, 2),
	(3, 'Certified Lover Boy', 2021, 3);

-- Copiando estrutura para tabela sistema_musica.artistas
CREATE TABLE IF NOT EXISTS `artistas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `pais` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela sistema_musica.artistas: ~3 rows (aproximadamente)
INSERT INTO `artistas` (`id`, `nome`, `genero`, `pais`) VALUES
	(1, 'Anitta', 'Pop', 'Brasil'),
	(2, 'Coldplay', 'Rock Alternativo', 'Reino Unido'),
	(3, 'Drake', 'Hip Hop', 'Canadá');

-- Copiando estrutura para tabela sistema_musica.musicas
CREATE TABLE IF NOT EXISTS `musicas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `duracao` varchar(10) NOT NULL,
  `album_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  CONSTRAINT `1` FOREIGN KEY (`album_id`) REFERENCES `albuns` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela sistema_musica.musicas: ~6 rows (aproximadamente)
INSERT INTO `musicas` (`id`, `titulo`, `duracao`, `album_id`) VALUES
	(1, 'Envolver', '3:13', 1),
	(2, 'Girl from Rio', '3:14', 1),
	(3, 'Higher Power', '3:31', 2),
	(4, 'My Universe', '3:48', 2),
	(5, 'Way 2 Sexy', '4:17', 3),
	(6, 'Girls Want Girls', '3:42', 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
