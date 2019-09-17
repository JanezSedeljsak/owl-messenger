CREATE TABLE `Students` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`grade` FLOAT,
	`created_at` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Teachers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`student_id` INT,
	`name` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `Courses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255),
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `StudentCourses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`student_id` INT NOT NULL,
	`course_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Teachers` ADD CONSTRAINT `Teachers_fk0` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`);

ALTER TABLE `StudentCourses` ADD CONSTRAINT `StudentCourses_fk0` FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`);

ALTER TABLE `StudentCourses` ADD CONSTRAINT `StudentCourses_fk1` FOREIGN KEY (`course_id`) REFERENCES `Courses`(`id`);
