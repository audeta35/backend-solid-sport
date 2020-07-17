-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 18, 2020 at 12:19 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `solidsport`
--

-- --------------------------------------------------------

--
-- Table structure for table `athlete`
--

CREATE TABLE `athlete` (
  `id_atlet` int(11) NOT NULL,
  `atlet_name` varchar(255) NOT NULL,
  `kontingen` varchar(255) NOT NULL,
  `class` varchar(21) NOT NULL,
  `kata_name` varchar(21) NOT NULL,
  `grouping` varchar(11) NOT NULL,
  `attribute` varchar(21) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `athlete`
--

INSERT INTO `athlete` (`id_atlet`, `atlet_name`, `kontingen`, `class`, `kata_name`, `grouping`, `attribute`, `status`) VALUES
(376, 'audeta', 'bogor', 'none', 'inkai', 'group 1', 'aka', 1),
(377, 'Budi kusuma negara', 'JOKABO', 'none', 'BOO', 'group 1', 'aka', 2),
(378, 'Bidu musuka ranaga', 'JOKCI', 'none', 'BOO', 'group 1', 'ao', 1);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`) VALUES
(1, 'group 1');

-- --------------------------------------------------------

--
-- Table structure for table `match`
--

CREATE TABLE `match` (
  `id_match` int(11) NOT NULL,
  `id_atlet` int(11) NOT NULL,
  `tatami` varchar(255) NOT NULL,
  `class` varchar(21) NOT NULL,
  `info` text DEFAULT NULL,
  `round` varchar(11) NOT NULL,
  `group_name` varchar(50) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `match`
--

INSERT INTO `match` (`id_match`, `id_atlet`, `tatami`, `class`, `info`, `round`, `group_name`, `status`) VALUES
(1, 376, 'aka', 'none', NULL, 'null', 'group 1', '1'),
(2, 378, 'ao', 'none', NULL, 'null', 'group 1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `points`
--

CREATE TABLE `points` (
  `id_point` int(11) NOT NULL,
  `id_match` int(11) NOT NULL,
  `total_point` double NOT NULL,
  `id_atlet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `points`
--

INSERT INTO `points` (`id_point`, `id_match`, `total_point`, `id_atlet`) VALUES
(15, 1, 27.08, 376),
(16, 1, 27.08, 376);

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `id_result` int(11) NOT NULL,
  `id_match` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_atlet` int(11) NOT NULL,
  `technical_result` float NOT NULL,
  `athletic_result` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`id_result`, `id_match`, `id_user`, `id_atlet`, `technical_result`, `athletic_result`) VALUES
(26, 1, 7, 376, 8.2, 8.4),
(27, 1, 6, 376, 5.6, 6.4),
(28, 1, 1, 376, 8.4, 8.4),
(31, 1, 4, 376, 6.8, 9.8),
(32, 1, 2, 376, 0, 0),
(33, 1, 3, 376, 7, 7.4),
(34, 1, 5, 376, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `token` text DEFAULT NULL,
  `tatami` varchar(21) NOT NULL,
  `name` varchar(21) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `level` int(11) NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `token`, `tatami`, `name`, `username`, `password`, `level`, `status`) VALUES
(1, '', 'aka', 'j1', 'Tiger', 'supratman', 0, 'offline'),
(2, '', 'ao', 'j2', 'a7v', 'a7v', 0, 'offline'),
(3, '', 'aka', 'j3', 'Leopard', 'asd', 0, 'online'),
(4, '', 'aka', 'j4', 'Panzer 4', 'dsadsa', 0, 'offline'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6W3siaWRfdXNlciI6NSwidG9rZW4iOiIiLCJ0YXRhbWkiOiJhbyIsIm5hbWUiOiJqNSIsInVzZXJuYW1lIjoiTWF1cyIsInBhc3N3b3JkIjoiYXNkYXNkYXNkIiwibGV2ZWwiOjAsInN0YXR1cyI6Im9mZmxpbmUifV0sImlhdCI6MTU5NTAyMjk5MiwiZXhwIjoxNTk1MDY2MTkyfQ.dpmkmlXneoJloOs0MibU8cz30zr_VuGoKwmWWBCt6CY', 'ao', 'j5', 'Maus', 'asdasdasd', 0, 'online'),
(6, '', 'ao', 'j6', 'Panther', 'panther', 0, 'offline'),
(7, '', 'aka', 'j7', 'boo', 'flakpanser', 0, 'offline'),
(8, '', 'aka', 'admin', 'Flak Panzer', 'audeta', 1, 'offline');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `athlete`
--
ALTER TABLE `athlete`
  ADD PRIMARY KEY (`id_atlet`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `id_atlet` (`id_atlet`);

--
-- Indexes for table `points`
--
ALTER TABLE `points`
  ADD PRIMARY KEY (`id_point`),
  ADD KEY `id_atlet` (`id_atlet`),
  ADD KEY `id_match` (`id_match`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`id_result`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `athlete`
--
ALTER TABLE `athlete`
  MODIFY `id_atlet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=380;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `points`
--
ALTER TABLE `points`
  MODIFY `id_point` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `id_result` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
