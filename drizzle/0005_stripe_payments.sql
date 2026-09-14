ALTER TABLE `bookings` ADD `paymentStatus` enum('unpaid','paid','refunded','failed') NOT NULL DEFAULT 'unpaid';--> statement-breakpoint
ALTER TABLE `bookings` ADD `stripeSessionId` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `stripePaymentIntentId` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `amountCents` int;--> statement-breakpoint
ALTER TABLE `bookings` ADD `currency` varchar(3) DEFAULT 'eur';
