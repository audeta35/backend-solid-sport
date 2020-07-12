-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 12 Jul 2020 pada 11.51
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.3.18

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
-- Struktur dari tabel `athlete`
--

CREATE TABLE `athlete` (
  `id_atlet` int(11) NOT NULL,
  `atlet_name` varchar(255) NOT NULL,
  `kontingen` varchar(255) NOT NULL,
  `class` varchar(21) NOT NULL,
  `kata_name` varchar(21) NOT NULL,
  `grouping` varchar(1) NOT NULL,
  `attribute` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `competition`
--

CREATE TABLE `competition` (
  `id_match` int(11) NOT NULL,
  `id_atlet` int(11) NOT NULL,
  `tatami` varchar(255) NOT NULL,
  `class` varchar(21) NOT NULL,
  `info` text NOT NULL,
  `round` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `points`
--

CREATE TABLE `points` (
  `id_point` int(11) NOT NULL,
  `id_result` int(11) NOT NULL,
  `total_point` int(11) NOT NULL,
  `id_atlet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `result`
--

CREATE TABLE `result` (
  `id_result` int(11) NOT NULL,
  `id_match` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `technical_result` int(11) NOT NULL,
  `athletic_result` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `token` text NOT NULL,
  `tatami` varchar(21) NOT NULL,
  `name` varchar(21) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `level` int(11) NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `token`, `tatami`, `name`, `username`, `password`, `level`, `status`) VALUES
(1, '', 'aka', 'j1', 'Tiger', 'supratman', 0, 'online'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6W3siaWRfdXNlciI6MywidG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnljeUk2VzNzaWFXUmZkWE5sY2lJNk15d2lkRzlyWlc0aU9pSWlMQ0owWVhSaGJXa2lPaUlpTENKdVlXMWxJam9pWVdSdGFXNGlMQ0oxYzJWeWJtRnRaU0k2SW1GMVpHVjBZU0lzSW5CaGMzTjNiM0prSWpvaVlYVmtaWFJoSWl3aWJHVjJaV3dpT2pFc0luTjBZWFIxY3lJNkltOW1abXhwYm1VaWZWMHNJbWxoZENJNk1UVTVORFV5TVRrNE5pd2laWGh3SWpveE5UazBOVFkxTVRnMmZRLmwwWTMyQkdzY0RhZ19sQUpUM1QyQzB4RjBuNll1TW5lWk1XX3RuZDI2cFEiLCJ0YXRhbWkiOiIiLCJuYW1lIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImF1ZGV0YSIsInBhc3N3b3JkIjoiYXVkZXRhIiwibGV2ZWwiOjEsInN0YXR1cyI6Im9ubGluZSJ9XSwiaWF0IjoxNTk0NTMxMjUwLCJleHAiOjE1OTQ1NzQ0NTB9.GhJGmegcYhe5CowiDsfyfMy1wnKmWqX7lu0RgKMi_6g', 'aka', 'j7', 'Flak Panzer', 'audeta', 1, 'online'),
(4, '', 'aka', 'j3', 'Leopard', 'asd', 0, 'offline'),
(5, '', 'aka', 'j4', 'Panzer 4', 'dsadsa', 0, 'offline'),
(6, '', 'ao', 'j5', 'Maus', 'asdasdasd', 0, 'offline'),
(7, '', 'ao', 'j6', 'Panther', 'panther', 0, 'offline'),
(8, '', 'aka', 'j7', 'Flak Panzer', 'flakpanser', 0, 'offline'),
(10, '', 'ao', 'j2', 'a7v', 'a7v', 0, 'offline');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `athlete`
--
ALTER TABLE `athlete`
  ADD PRIMARY KEY (`id_atlet`);

--
-- Indeks untuk tabel `competition`
--
ALTER TABLE `competition`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `id_atlet` (`id_atlet`);

--
-- Indeks untuk tabel `points`
--
ALTER TABLE `points`
  ADD PRIMARY KEY (`id_point`),
  ADD KEY `id_atlet` (`id_atlet`),
  ADD KEY `id_result` (`id_result`);

--
-- Indeks untuk tabel `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`id_result`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `athlete`
--
ALTER TABLE `athlete`
  MODIFY `id_atlet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `points`
--
ALTER TABLE `points`
  MODIFY `id_point` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `result`
--
ALTER TABLE `result`
  MODIFY `id_result` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
