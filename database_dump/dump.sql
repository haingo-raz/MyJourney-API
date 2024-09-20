-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for myjourney
CREATE DATABASE IF NOT EXISTS `myjourney` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `myjourney`;

-- Dumping structure for table myjourney.users
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table myjourney.users: ~2 rows (approximately)
REPLACE INTO `users` (`email`, `password`) VALUES
	('admin@mj.com', '$2b$10$tKYfDJjIGfsdtDddb5pZAOMaW6dUfRg99IurtR4D9uUneKySxWx6O'),
	('haingoraza@mj.com', '$2b$10$tFl4nUs8vNpH2Vk9Nl4yle9fFyFlLTCNCHeDW1SYEIzs0NHqnv0va');

-- Dumping structure for table myjourney.workout
CREATE TABLE IF NOT EXISTS `workout` (
  `workoutId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `videoUrl` varchar(500) NOT NULL,
  `duration` int(11) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `dayCreated` varchar(50) NOT NULL,
  `status` binary(50) NOT NULL,
  PRIMARY KEY (`workoutId`),
  KEY `FK_users` (`user_email`),
  CONSTRAINT `FK_users` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table myjourney.workout: ~5 rows (approximately)
REPLACE INTO `workout` (`workoutId`, `title`, `videoUrl`, `duration`, `user_email`, `dayCreated`, `status`) VALUES
	(4, 'Cardio Fitness', 'https://www.youtube.com/watch?v=tpwRmyzyiwM', 4, 'admin@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(5, 'Cardio Fitness Marshall Test', 'https://www.youtube.com/watch?v=tpwRmyzyiwM', 4, 'admin@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(7, 'Abs workout Chloe', 'https://www.youtube.com/watch?v=2pLT-olgUJs', 11, 'haingoraza@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(9, 'Crazy Abs Day 2', 'https://www.youtube.com/watch?v=2pLT-olgUJs', 11, 'haingoraza@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(11, 'ABS in 2 weeks', 'https://www.youtube.com/watch?v=2pLT-olgUJs', 11, 'haingoraza@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
