CREATE TABLE `blog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`createdAt` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`tags` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "name", "password") SELECT "id", "name", "password" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;