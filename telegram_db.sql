-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.16-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table msgdb.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `created_time` datetime DEFAULT NULL,
  `admin` varchar(36) DEFAULT NULL,
  `img` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin` (`admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table msgdb.groupsusers
CREATE TABLE IF NOT EXISTS `groupsusers` (
  `id` varchar(36) DEFAULT uuid(),
  `group_id` varchar(36) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table msgdb.groupsusers: ~5 rows (approximately)
/*!40000 ALTER TABLE `groupsusers` DISABLE KEYS */;
INSERT IGNORE INTO `groupsusers` (`id`, `group_id`, `created_time`, `user_id`, `type`) VALUES
	('9c9f7c3b-e475-11e9-aee6-902b34549865', '5ef4d193-d45b-11e9-9531-f04da2b5f496', '2019-10-01 20:02:20', 'ce870754-e2aa-11e9-b4bc-902b34549865', 'member'),
	('81d182b8-e479-11e9-aee6-902b34549865', '72075741-d45b-11e9-9531-f04da2b5f496', '2019-10-01 20:30:13', 'c50329b2-e2aa-11e9-b4bc-902b34549865', 'member'),
	('914420f5-e48e-11e9-aee6-902b34549865', '21609c7a-e48d-11e9-aee6-902b34549865', '2019-10-01 23:01:00', 'ce870754-e2aa-11e9-b4bc-902b34549865', 'member'),
	('e21e46ec-e490-11e9-aee6-902b34549865', '5ef4d193-d45b-11e9-9531-f04da2b5f496', '2019-10-01 23:17:34', 'd471df89-e2aa-11e9-b4bc-902b34549865', 'member'),
	('68565771-e498-11e9-aee6-902b34549865', '98b8ed9e-e48e-11e9-aee6-902b34549865', '2019-10-02 00:11:26', '55aa5463-dead-11e9-9f79-598bacbcaa1e', 'member');
/*!40000 ALTER TABLE `groupsusers` ENABLE KEYS */;

-- Dumping structure for table msgdb.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `user_id` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `msg_time` datetime NOT NULL,
  `group_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Messages_fk0` (`user_id`),
  KEY `Messages_fk1` (`group_id`),
  CONSTRAINT `Messages_fk0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `Messages_fk1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table msgdb.messages: ~12 rows (approximately)
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT IGNORE INTO `messages` (`id`, `user_id`, `content`, `msg_time`, `group_id`) VALUES
	('0014ebaa-e3ba-11e9-9560-902b34549865', '55aa5463-dead-11e9-9f79-598bacbcaa1e', 'ogj', '2019-09-30 21:39:21', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('16d9e137-e3d8-11e9-9560-902b34549865', 'ce870754-e2aa-11e9-b4bc-902b34549865', 'ok', '2019-10-01 01:14:44', '72075741-d45b-11e9-9531-f04da2b5f496'),
	('4f114e79-e3bd-11e9-9560-902b34549865', '39f39e5e-e3bd-11e9-9560-902b34549865', 'neki pa še neki', '2019-09-30 22:03:02', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('71a607d8-e452-11e9-aee6-902b34549865', 'ce870754-e2aa-11e9-b4bc-902b34549865', 'neki ok', '2019-10-01 15:50:35', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('7396fc60-e3d9-11e9-9560-902b34549865', 'ce870754-e2aa-11e9-b4bc-902b34549865', 'a', '2019-10-01 01:24:29', '72075741-d45b-11e9-9531-f04da2b5f496'),
	('8ffe5e01-e451-11e9-aee6-902b34549865', 'ce870754-e2aa-11e9-b4bc-902b34549865', 'ok neki', '2019-10-01 15:44:17', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('930eec0f-e3da-11e9-9560-902b34549865', '55aa5463-dead-11e9-9f79-598bacbcaa1e', 'nov msg', '2019-10-01 01:32:32', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('c8f1acc2-e3b8-11e9-9560-902b34549865', '55aa5463-dead-11e9-9f79-598bacbcaa1e', 'Zdravo fant', '2019-09-25 11:25:41', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('c8f1bd36-e3b8-11e9-9560-902b34549865', 'c50329b2-e2aa-11e9-b4bc-902b34549865', 'Ka boš reku', '2019-09-26 11:25:41', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('c8f1be4c-e3b8-11e9-9560-902b34549865', '55aa5463-dead-11e9-9f79-598bacbcaa1e', 'A si ti gey?', '2019-09-27 11:25:41', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('c8f1bf43-e3b8-11e9-9560-902b34549865', 'c50329b2-e2aa-11e9-b4bc-902b34549865', 'Vde', '2019-09-28 11:25:41', '5ef4d193-d45b-11e9-9531-f04da2b5f496'),
	('def96c6e-e3b9-11e9-9560-902b34549865', '55aa5463-dead-11e9-9f79-598bacbcaa1e', 'Mjau mjau', '2019-09-30 21:38:26', '72075741-d45b-11e9-9531-f04da2b5f496');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

-- Dumping structure for table msgdb.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `profile_img` text DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
