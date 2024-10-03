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

-- Dumping structure for table myjourney.profile
CREATE TABLE IF NOT EXISTS `profile` (
  `age` int(11) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `dailyIntakeCalorie` int(11) DEFAULT NULL,
  `fitnessGoals` varchar(1000) DEFAULT NULL,
  `weight_goal` int(11) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `profile_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`profile_id`),
  KEY `FK_profile` (`user_email`),
  CONSTRAINT `FK_profile` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table myjourney.profile: ~0 rows (approximately)
REPLACE INTO `profile` (`age`, `gender`, `height`, `weight`, `dailyIntakeCalorie`, `fitnessGoals`, `weight_goal`, `user_email`, `profile_id`) VALUES
	(20, 'male', 179, 68, 1000, NULL, NULL, 'testv4@mj.com', 1);
  (NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin@mj.com', 2),
  (NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'haingoraza@mj.com', 3),
  (NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'testv3@mj.com', 4);

-- Dumping structure for table myjourney.users
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table myjourney.users: ~2 rows (approximately)
REPLACE INTO `users` (`email`, `password`) VALUES
	('testv4@mj.com', '$2b$10$1YDiuYJ5EGLyW/1g6PK/q.ab.tkHNih8xxSYGW7PE//MQ.DxfB.Dm');
	('admin@mj.com', '$2b$10$tKYfDJjIGfsdtDddb5pZAOMaW6dUfRg99IurtR4D9uUneKySxWx6O'),
	('haingoraza@mj.com', '$2b$10$tFl4nUs8vNpH2Vk9Nl4yle9fFyFlLTCNCHeDW1SYEIzs0NHqnv0va'),
	('testv3@mj.com', '$2b$10$U.MzuFaiTlCpKf6.WLXYEedETKySV80kRHXY2te3nCF6ALZrKHMdS'),


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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table myjourney.workout: ~13 rows (approximately)
REPLACE INTO `workout` (`workoutId`, `title`, `videoUrl`, `duration`, `user_email`, `dayCreated`, `status`) VALUES
	(4, 'Cardio Fitness', 'https://www.youtube.com/watch?v=tpwRmyzyiwM', 4, 'admin@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(5, 'Cardio Fitness Marshall Test', 'https://www.youtube.com/watch?v=tpwRmyzyiwM', 4, 'admin@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(7, 'Abs workout Chloe', 'https://www.youtube.com/watch?v=2pLT-olgUJs', 11, 'haingoraza@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(9, 'Crazy Abs Day 2', 'https://www.youtube.com/watch?v=2pLT-olgUJs', 11, 'haingoraza@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(11, 'ABS in 2 weeks', 'https://www.youtube.com/watch?v=2pLT-olgUJs', 11, 'haingoraza@mj.com', '2024-09-18', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(14, 'test', 'https://www.youtube.com/dsfsfd', 10, 'testv3@mj.com', '2024-09-28', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(15, 'test', 'https://www.youtube.com/kjgjgh', 10, 'testv3@mj.com', '2024-09-28', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(16, 'test', 'https://www.youtube.com/khkjhj', 10, 'testv3@mj.com', '2024-09-28', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(18, '20 Min Cardio HIIT Workout - Full Body, No Repeats, No Equipment', 'https://www.youtube.com/watch?v=DlnfCNGoGM4', 20, 'testv3@mj.com', '2024-10-01', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(19, 'Do This Everyday To Lose Weight | 2 Weeks Shred Challenge', 'https://www.youtube.com/watch?v=2MoGxae-zyo', 14, 'testv3@mj.com', '2024-10-01', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(20, 'Do This Everyday To Lose Weight | 2 Weeks Shred Challenge', 'https://www.youtube.com/watch?v=2MoGxae-zyo', 14, 'testv4@mj.com', '2024-10-01', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(21, 'Best Full Body Workout to Lose Fat ????????20 mins | 28 Day Challenge', 'https://www.youtube.com/watch?v=CGmr02bfHUo', 21, 'testv4@mj.com', '2024-10-01', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(22, '15 min Intense HIIT for Fat Burn | Standing & No Equipment', 'https://www.youtube.com/watch?v=9rQ5wxssQss', 16, 'testv4@mj.com', '2024-10-02', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000),
	(23, 'Get Shredded for the Summer! 15 min Standing HIIT Workout', 'https://www.youtube.com/watch?v=JDgc6CxwEMI', 15, 'testv4@mj.com', '2024-10-02', _binary 0x46616c7365000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
