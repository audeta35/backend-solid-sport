-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 17 Jul 2020 pada 16.02
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
  `grouping` varchar(11) NOT NULL,
  `attribute` varchar(21) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `athlete`
--

INSERT INTO `athlete` (`id_atlet`, `atlet_name`, `kontingen`, `class`, `kata_name`, `grouping`, `attribute`, `status`) VALUES
(376, 'audeta', 'bogor', 'none', 'inkai', 'group 1', 'aka', 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `athlete`
--
ALTER TABLE `athlete`
  ADD PRIMARY KEY (`id_atlet`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `athlete`
--
ALTER TABLE `athlete`
  MODIFY `id_atlet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=377;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
