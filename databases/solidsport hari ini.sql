-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 07 Nov 2020 pada 10.07
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.2.33

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
  `atlet_name` text NOT NULL,
  `kontingen` text NOT NULL,
  `class` text NOT NULL,
  `kata_name` text NOT NULL,
  `grouping` text NOT NULL,
  `attribute` varchar(21) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `athlete`
--

INSERT INTO `athlete` (`id_atlet`, `atlet_name`, `kontingen`, `class`, `kata_name`, `grouping`, `attribute`, `status`) VALUES
(1, 'ATALA ARKA S. MADJID', 'DISPORA KOTAMOBAGU', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 2),
(2, 'M. SAHILNOATHA SHAANOO MAULANA', 'GARUDA MUDA', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 2),
(3, 'ACHMAD RIFKI RAMADHAN', 'LEMKARI NGAWI', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 1),
(4, 'RIFQY ADZKA ADITYA', 'AMC INKANAS DKI', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(5, 'M. KAUTSAR MEHAGA P', 'BUMI MAKMUR', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(6, 'ALFARRAS DAMAR YUDHISTIRA', 'IPKC', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(7, 'AHMAD HAFIDH ARKAN PRATAMA', 'LEMKARI NGAWI', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(8, 'M. RASHANKAREEM MAULANA', 'GARUDA MUDA', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(9, 'CAHAYA F.A. DAMOPOLII', 'DISPORA KOTAMOBAGU', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(10, 'RANGGA', 'AMC INKANAS DKI', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(11, 'NAYAKA WICAKSANA PRASETYO', 'LEMKARI NGAWI', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(12, 'FIKI SAPUTRA PURNAMA', 'JIMUSHO', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(13, 'MUHAMAD PUTRA ADITYA', 'AMC INKANAS DKI', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(14, 'KENZIE ADITYA PRAMUDITHO', 'GARUDA MUDA', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(15, 'M. MAULANA ARBI', 'LEMKARI SUMUT', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(16, 'VIRZATULLOH RAMADHAN HILLARY', 'CIPAISAN PURWAKARTA', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(17, 'RESKY EKA SAPUTRA', 'IPKC', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', '', 'group a', 'ao', 0),
(18, 'ATALA ARKA S. MADJID', 'DISPORA KOTAMOBAGU', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', 'ASA', 'group final', 'aka', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `groups`
--

INSERT INTO `groups` (`id`, `group_name`) VALUES
(1, 'group a'),
(2, 'group b'),
(3, 'group final'),
(4, 'group c'),
(5, 'group d');

-- --------------------------------------------------------

--
-- Struktur dari tabel `match`
--

CREATE TABLE `match` (
  `id_match` int(11) NOT NULL,
  `id_atlet` int(11) NOT NULL,
  `tatami` varchar(255) NOT NULL,
  `class` text NOT NULL,
  `info` text DEFAULT NULL,
  `round` varchar(11) NOT NULL,
  `group_name` varchar(50) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `match`
--

INSERT INTO `match` (`id_match`, `id_atlet`, `tatami`, `class`, `info`, `round`, `group_name`, `status`) VALUES
(1, 3, 'ao', 'KELAS PERTANDINGAN KATA PERORANGAN SD SABUK PUTIH-KUNING PUTRA', NULL, 'null', 'group a', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `points`
--

CREATE TABLE `points` (
  `id_point` int(11) NOT NULL,
  `id_match` int(11) NOT NULL,
  `total_point` double NOT NULL,
  `id_atlet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `points`
--

INSERT INTO `points` (`id_point`, `id_match`, `total_point`, `id_atlet`) VALUES
(3, 1, 22.06, 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `result`
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
-- Dumping data untuk tabel `result`
--

INSERT INTO `result` (`id_result`, `id_match`, `id_user`, `id_atlet`, `technical_result`, `athletic_result`) VALUES
(6, 1, 2, 3, 7.8, 7.6),
(7, 1, 3, 3, 7.2, 7.4),
(8, 1, 4, 3, 7.4, 7.4),
(9, 1, 5, 3, 7.4, 7.4),
(10, 1, 1, 3, 7.2, 7);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tatami`
--

CREATE TABLE `tatami` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `class` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
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
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `token`, `tatami`, `name`, `username`, `password`, `level`, `status`) VALUES
(1, 'null', 'aka', 'j1', 'j1', 'j1', 0, 'offline'),
(2, 'null', 'ao', 'j2', 'j2', 'j2', 0, 'offline'),
(3, 'null', 'aka', 'j3', 'j3', 'j3', 0, 'offline'),
(4, 'null', 'aka', 'j4', 'j4', 'j4', 0, 'offline'),
(5, 'null', 'ao', 'j5', 'j5', 'j5', 0, 'offline'),
(19, 'null', '', 'admin', 'admin', 'admin', 1, 'online'),
(20, 'null', '1', 'admin', 'papanskor', 'papanskor', 1, 'offline'),
(21, 'null', '1', 'admin', 'remote', 'remote', 1, 'offline'),
(22, '', '1', 'admin', 'server', 'server', 1, 'offline');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `athlete`
--
ALTER TABLE `athlete`
  ADD PRIMARY KEY (`id_atlet`);

--
-- Indeks untuk tabel `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `id_atlet` (`id_atlet`);

--
-- Indeks untuk tabel `points`
--
ALTER TABLE `points`
  ADD PRIMARY KEY (`id_point`),
  ADD KEY `id_atlet` (`id_atlet`),
  ADD KEY `id_match` (`id_match`);

--
-- Indeks untuk tabel `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`id_result`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `tatami`
--
ALTER TABLE `tatami`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id_atlet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `match`
--
ALTER TABLE `match`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `points`
--
ALTER TABLE `points`
  MODIFY `id_point` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `result`
--
ALTER TABLE `result`
  MODIFY `id_result` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `tatami`
--
ALTER TABLE `tatami`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
