-- Schema for Event Management application
-- Creates database `event_db` and tables: users, events, registrations, notifications
-- Adjust database name if you prefer (or change DB_NAME in backend/.env)

-- Drop existing and recreate database (use with care)
DROP DATABASE IF EXISTS `event_db`;
CREATE DATABASE IF NOT EXISTS `event_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `event_db`;

-- Users table
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user','admin') NOT NULL DEFAULT 'user',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Events table
CREATE TABLE `events` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `date` DATE NOT NULL,
  `time` VARCHAR(50),
  `venue` VARCHAR(255),
  `mode` ENUM('online','offline') NOT NULL DEFAULT 'online',
  `max_attendees` INT DEFAULT 0,
  `fee` DECIMAL(10,2) DEFAULT 0.00,
  `image_url` VARCHAR(1024),
  `created_by` INT UNSIGNED,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_events_date` (`date`),
  CONSTRAINT `fk_events_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Registrations table
CREATE TABLE `registrations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `status` ENUM('confirmed','pending','rejected') DEFAULT 'pending',
  `payment_status` ENUM('paid','unpaid','n/a') DEFAULT 'n/a',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_event_user` (`event_id`,`user_id`),
  INDEX `idx_reg_event` (`event_id`),
  INDEX `idx_reg_user` (`user_id`),
  CONSTRAINT `fk_reg_event` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reg_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications table
CREATE TABLE `notifications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255),
  `message` TEXT,
  `user_id` INT UNSIGNED,
  `event_id` INT UNSIGNED,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_not_user` (`user_id`),
  INDEX `idx_not_event` (`event_id`),
  CONSTRAINT `fk_not_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_not_event` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: seed an admin user and a sample event for quick testing
-- NOTE: password is stored in plain-text in this beginner scaffold. Change to hashed passwords for production.
INSERT INTO `users` (`name`,`email`,`password`,`role`) VALUES ('Admin User','admin@example.com','admin123','admin');

INSERT INTO `events` (`title`,`description`,`date`,`time`,`venue`,`mode`,`max_attendees`,`fee`,`created_by`)
VALUES ('Sample Online Event','This is a sample event for testing','2025-11-15','18:00','Online','online',100,0.00,1);

-- Additional sample data: a regular user, another event, and sample registrations
INSERT INTO `users` (`name`,`email`,`password`,`role`) VALUES
  ('Test User','user@example.com','user123','user');

INSERT INTO `events` (`title`,`description`,`date`,`time`,`venue`,`mode`,`max_attendees`,`fee`,`created_by`)
VALUES
  ('BIT HACKATHON','BIT HACKATHON - Open to all students.','2025-11-01','10:00','Campus Auditorium','offline',200,0.00,1);

-- Register Test User (id 2) for both events (assumes auto-increment ids: users 1=admin,2=test; events 1=sample,2=bit hackathon)
INSERT INTO `registrations` (`event_id`,`user_id`,`status`,`payment_status`) VALUES
  (1, 2, 'confirmed', 'n/a'),
  (2, 2, 'confirmed', 'n/a');

-- Done
