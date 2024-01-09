CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`username` varchar(30) NOT NULL,
	`password` text NOT NULL,
	`email` varchar(50) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT '2024-01-08 00:35:31.203',
	`updated_at` datetime NOT NULL DEFAULT '2024-01-08 00:35:31.203',
	`status` boolean NOT NULL DEFAULT true,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
