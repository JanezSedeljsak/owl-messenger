-- --------------------------------------------------------
-- Strežnik:                     127.0.0.1
-- Verzija strežnika:            10.3.10-MariaDB - mariadb.org binary distribution
-- Operacijski sistem strežnika: Win64
-- HeidiSQL Različica:           10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for tabela msgapp.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `created_time` datetime NOT NULL,
  `admin` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin` (`admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table msgapp.groups: ~2 rows (približno)
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT IGNORE INTO `groups` (`id`, `name`, `created_time`, `admin`) VALUES
	('5ef4d193-d45b-11e9-9531-f04da2b5f496', 'kakav', '2018-02-06 07:19:25', '55aa5463-dead-11e9-9f79-598bacbcaa1e'),
	('72075741-d45b-11e9-9531-f04da2b5f496', '4.tra', '2018-02-06 07:19:25', '55aa5463-dead-11e9-9f79-598bacbcaa1e');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

-- Dumping structure for tabela msgapp.groupsusers
CREATE TABLE IF NOT EXISTS `groupsusers` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `group_id` varchar(36) NOT NULL,
  `created_time` datetime NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `type_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `GroupsUsers_fk0` (`group_id`),
  KEY `GroupsUsers_fk1` (`user_id`),
  KEY `GroupsUsers_fk2` (`type_id`),
  CONSTRAINT `GroupsUsers_fk0` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `GroupsUsers_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `GroupsUsers_fk2` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table msgapp.groupsusers: ~0 rows (približno)
/*!40000 ALTER TABLE `groupsusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupsusers` ENABLE KEYS */;

-- Dumping structure for tabela msgapp.messages
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

-- Dumping data for table msgapp.messages: ~0 rows (približno)
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

-- Dumping structure for tabela msgapp.types
CREATE TABLE IF NOT EXISTS `types` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table msgapp.types: ~2 rows (približno)
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT IGNORE INTO `types` (`id`, `name`) VALUES
	('f7156388-d45b-11e9-9531-f04da2b5f496', 'guest'),
	('f8f4c626-d45b-11e9-9531-f04da2b5f496', 'admin');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;

-- Dumping structure for tabela msgapp.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table msgapp.users: ~1 rows (približno)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `name`, `surname`, `email`, `password`, `google_id`, `facebook_id`, `date_created`) VALUES
	('55aa5463-dead-11e9-9f79-598bacbcaa1e', 'janez', 'sedeljsak', 'janez.sedeljsak@gmail.com', 'sha1$74ce6c32$1$d52984529c0df26fd04759275daa408e75681a54', NULL, NULL, '2019-09-24 11:25:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
