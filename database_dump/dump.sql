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
  `daily_intake_calorie` int(11) DEFAULT NULL,
  `fitness_goals` varchar(1000) DEFAULT NULL,
  `weight_goal` int(11) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `profile_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`profile_id`),
  KEY `FK_profile` (`user_email`),
  CONSTRAINT `FK_profile` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table myjourney.profile: ~6 rows (approximately)
REPLACE INTO `profile` (`age`, `gender`, `height`, `weight`, `daily_intake_calorie`, `fitness_goals`, `weight_goal`, `user_email`, `profile_id`) VALUES
	(20, 'male', 179, 68, 1000, NULL, NULL, 'testv4@mj.com', 1),
	(23, NULL, NULL, NULL, NULL, NULL, NULL, 'testv5new@mj.com', 2),
	(NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'testca@mj.com', 3),
	(NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'testadmin@mj.com', 4),
	(20, 'male', 155, 55, 1200, 'Becoming healthier', 60, 'hr@mj.com', 5),
	(22, 'female', 165, 57, 1400, 'Slim down', 54, 'admin@mj.com', 9);

-- Dumping structure for table myjourney.user
CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table myjourney.user: ~6 rows (approximately)
REPLACE INTO `user` (`email`, `password`) VALUES
	('admin@mj.com', '$2b$10$XAOzDZsHTwuIGTY.dGfwVuz1frGffJzmxD0dMSkDAdkQ1zF6XaYR6'),
	('testadmin@mj.com', '$2b$10$KZRvspPC9P5QNhwGJ3ESROMUlkMEwFb87eiQXh0dRcR1Pm0tnuc2O'),
	('testca@mj.com', '$2b$10$eh0271zk/ciUAf35snHnq.4gd0JdA5J2bX8pa/cur44zd1qWWVsu.'),
	('testv4@mj.com', '$2b$10$1YDiuYJ5EGLyW/1g6PK/q.ab.tkHNih8xxSYGW7PE//MQ.DxfB.Dm'),
	('testv5new@mj.com', '$2b$10$jeeE4zDI/EhKCZm3NXCjfeqh9KpLT5OCF1PWnEDWxacqb6OXMMOke');

-- Dumping structure for table myjourney.workout
CREATE TABLE IF NOT EXISTS `workout` (
  `workout_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `video_url` varchar(500) NOT NULL,
  `duration` int(11) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `day_created` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`workout_id`) USING BTREE,
  KEY `FK_users` (`user_email`),
  CONSTRAINT `FK_users` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table myjourney.workout: ~18 rows (approximately)
REPLACE INTO `workout` (`workout_id`, `title`, `video_url`, `duration`, `user_email`, `day_created`, `status`) VALUES
	(4, 'Cardio Fitness', 'https://www.youtube.com/watch?v=tpwRmyzyiwM', 4, 'admin@mj.com', '2024-09-18', 0),
	(5, 'Cardio Fitness Marshall Test', 'https://www.youtube.com/watch?v=tpwRmyzyiwM', 4, 'admin@mj.com', '2024-09-18', 0),
	(20, 'Do This Everyday To Lose Weight | 2 Weeks Shred Challenge', 'https://www.youtube.com/watch?v=2MoGxae-zyo', 14, 'testv4@mj.com', '2024-10-01', 0),
	(21, 'Best Full Body Workout to Lose Fat ????????20 mins | 28 Day Challenge', 'https://www.youtube.com/watch?v=CGmr02bfHUo', 21, 'testv4@mj.com', '2024-10-01', 0),
	(22, '15 min Intense HIIT for Fat Burn | Standing & No Equipment', 'https://www.youtube.com/watch?v=9rQ5wxssQss', 16, 'testv4@mj.com', '2024-10-02', 0),
	(23, 'Get Shredded for the Summer! 15 min Standing HIIT Workout', 'https://www.youtube.com/watch?v=JDgc6CxwEMI', 15, 'testv4@mj.com', '2024-10-02', 0),
	(24, 'Zumba', 'https://www.youtube.com/watch?v=mZeFvX3ALKY', 31, 'testv5new@mj.com', '2024-10-06', 0),
	(30, 'Test Workout', 'https://www.youtube.com/watch?v=kuH-RRf6WP0', 21, 'admin@mj.com', '2024-10-17', 1),
	(32, '20 MIN FULL BODY WORKOUT // No Equipment | Pamela Reif', 'https://www.youtube.com/watch?v=UBMk30rjy0o', 20, 'testca@mj.com', '2024-11-19', 0),
	(34, 'Test Workout', 'https://www.youtube.com/watch?v=kuH-RRf6WP0', 21, 'admin@mj.com', '2024-10-17', 1),
	(35, '20 Minute Full body cardio', 'https://www.youtube.com/watch?v=M0uO8X3_tEA', 29, 'admin@mj.com', '2024-11-20', 1),
	(36, '10MIN everyday full body hourglass pilates workout // no equipment // beginner friendly', 'https://www.youtube.com/watch?v=u3UjeyPOjoU', 11, 'admin@mj.com', '2024-12-11', 1),
	(39, 'Zumba® 30-Minute Beginners Latin Dance Mini-Workout', 'https://www.youtube.com/watch?v=mZeFvX3ALKY', 30, 'admin@mj.com', '2024-12-12', 0),
	(40, '12 MIN DAILY STRETCH (full body) - for tight muscles, mobility & flexibility', 'https://www.youtube.com/watch?v=itJE4neqDJw', 14, 'admin@mj.com', '2024-12-15', 0),
	(41, '20 Min BEDTIME YOGA | Full Body Stretch | Tension Relief, Relaxation, Flexibility, Beginner Friendly', 'https://www.youtube.com/watch?v=6CueZ4zujMk', 20, 'admin@mj.com', '2024-12-15', 0),
	(42, '10MIN everyday full body hourglass pilates workout // no equipment // beginner friendly', 'https://www.youtube.com/watch?v=u3UjeyPOjoU&t=4s', 11, 'admin@mj.com', '2024-12-16', 0),
	(43, 'FULL BODY WORKOUT', 'https://www.youtube.com/watch?v=73NEi4HzHPs&pp=ygURMzAgbWludXRlIHdvcmtvdXQ%3D', 33, 'admin@mj.com', '2025-01-02', 1),
	(48, '10mn Shoulders exercise', 'https://www.youtube.com/watch?v=jXm0y-csiuE', 11, 'admin@mj.com', '2025-01-10', 1),
	(49, 'Get Abs in 2 WEEKS | Abs Workout Challenge', 'https://www.youtube.com/watch?v=2pLT-olgUJs&t=32s&pp=ygUKY2hsb2UgdGluZw%3D%3D', 11, 'admin@mj.com', '2025-01-10', 0),
	(50, 'Booty Burn Workout', 'https://www.youtube.com/watch?v=hpoj6MA_KVE', 16, 'admin@mj.com', '2025-01-23', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
