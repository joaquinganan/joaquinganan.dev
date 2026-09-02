CREATE TABLE `qa_lab_dispatch_locks` (
	`key` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`dispatched_at` integer NOT NULL
);
