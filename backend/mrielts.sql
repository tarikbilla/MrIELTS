-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2024 at 05:44 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mrielts`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `user_role` enum('admin','editor','subscriber') DEFAULT 'subscriber',
  `user_registered_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_avatar` varchar(255) DEFAULT NULL,
  `user_bio` varchar(11) DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`user_id`, `username`, `email`, `password`, `full_name`, `user_role`, `user_registered_date`, `user_avatar`, `user_bio`, `created_by_user_id`) VALUES
(1, 'mrielts', 'admin@mrielts.com', '$2b$10$EysNE1mIo5Q8fe2D0hcW.eWwedmXE58PBO6zDCEni09YxHvQrLbcS', 'Mr. IELTS', 'editor', '2023-12-04 20:02:04', '2024/05/user.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `level_id` int(11) NOT NULL,
  `level_name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postID` int(11) NOT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_content` longtext,
  `post_slug` varchar(255) NOT NULL,
  `post_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `post_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `authorID` int(11) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `featured_image` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post_categories`
--

CREATE TABLE `post_categories` (
  `post_cat_id` int(4) NOT NULL,
  `post_cat_name` varchar(255) NOT NULL,
  `post_cat_description` text NOT NULL,
  `post_cat_slug` varchar(255) NOT NULL,
  `post_cat_feature_img` varchar(255) DEFAULT NULL,
  `post_cat_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by_user_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_categories`
--

INSERT INTO `post_categories` (`post_cat_id`, `post_cat_name`, `post_cat_description`, `post_cat_slug`, `post_cat_feature_img`, `post_cat_created_date`, `created_by_user_id`) VALUES
(1, 'Technology', '', 'technology', NULL, '2024-05-07 17:43:54', 1),
(2, 'Learning', '', 'learning', NULL, '2024-05-07 17:50:47', 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `correct_answer` varchar(255) DEFAULT NULL,
  `option1` varchar(255) DEFAULT NULL,
  `option2` varchar(255) DEFAULT NULL,
  `option3` varchar(255) DEFAULT NULL,
  `option4` varchar(255) DEFAULT NULL,
  `question_type` enum('multiple_choice','true_false','short_answer','essay') NOT NULL,
  `before_text` text,
  `after_text` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `test_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `test_level_id` int(11) NOT NULL,
  `test_name` varchar(255) NOT NULL,
  `description` text,
  `test_type` enum('reading','writing','listening') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `test_levels`
--

CREATE TABLE `test_levels` (
  `test_level_id` int(11) NOT NULL,
  `test_level_name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `test_sessions`
--

CREATE TABLE `test_sessions` (
  `session_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` enum('active','completed','abandoned') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `full_name` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `profile_picture_url` text,
  `bio` text,
  `date_of_birth` date DEFAULT NULL,
  `address` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_answers`
--

CREATE TABLE `user_answers` (
  `user_answer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `given_answer` text NOT NULL,
  `answer_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`level_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postID`);

--
-- Indexes for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`post_cat_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `test_id` (`test_id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`test_id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `test_level_id` (`test_level_id`);

--
-- Indexes for table `test_levels`
--
ALTER TABLE `test_levels`
  ADD PRIMARY KEY (`test_level_id`);

--
-- Indexes for table `test_sessions`
--
ALTER TABLE `test_sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `test_id` (`test_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_answers`
--
ALTER TABLE `user_answers`
  ADD PRIMARY KEY (`user_answer_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `question_id` (`question_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `level_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_categories`
--
ALTER TABLE `post_categories`
  MODIFY `post_cat_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `test_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test_levels`
--
ALTER TABLE `test_levels`
  MODIFY `test_level_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test_sessions`
--
ALTER TABLE `test_sessions`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_answers`
--
ALTER TABLE `user_answers`
  MODIFY `user_answer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `tests` (`test_id`);

--
-- Constraints for table `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`level_id`),
  ADD CONSTRAINT `tests_ibfk_2` FOREIGN KEY (`test_level_id`) REFERENCES `test_levels` (`test_level_id`);

--
-- Constraints for table `test_sessions`
--
ALTER TABLE `test_sessions`
  ADD CONSTRAINT `test_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `test_sessions_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `tests` (`test_id`);

--
-- Constraints for table `user_answers`
--
ALTER TABLE `user_answers`
  ADD CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
