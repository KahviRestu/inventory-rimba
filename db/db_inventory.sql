-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2023 at 05:10 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerId` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `diskon` int(11) DEFAULT NULL,
  `type_diskon` varchar(255) DEFAULT NULL,
  `ktp` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerId`, `nama`, `contact`, `email`, `alamat`, `diskon`, `type_diskon`, `ktp`, `createdAt`, `updatedAt`) VALUES
(1, 'Kahvi Restu', '08080', 'kahvi@gmail.com', 'Bogor', 20, 'persentase', 'http://localhost:5000/images/ad9adedf66b1d5033d3987388e6eb135.png', '2023-07-08 17:15:40', '2023-07-08 17:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `itemId` int(11) NOT NULL,
  `nama_item` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `harga_satuan` int(11) DEFAULT NULL,
  `barang` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`itemId`, `nama_item`, `unit`, `stok`, `harga_satuan`, `barang`, `createdAt`, `updatedAt`) VALUES
(1, 'Item 1', 'pcs', 18, 25000, 'http://localhost:5000/images/3906c3c2b38356522054b560bc74b34e.png', '2023-07-08 17:11:58', '2023-07-08 17:45:47'),
(2, 'Item 2', 'pcs', 3, 50000, 'http://localhost:5000/images/ad9adedf66b1d5033d3987388e6eb135.png', '2023-07-08 17:43:14', '2023-07-08 17:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `salesId` int(11) NOT NULL,
  `code_transaksi` varchar(255) DEFAULT NULL,
  `tanggal_transaksi` datetime DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `total_diskon` int(11) DEFAULT NULL,
  `total_harga` int(11) DEFAULT NULL,
  `total_bayar` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`salesId`, `code_transaksi`, `tanggal_transaksi`, `customerId`, `total_diskon`, `total_harga`, `total_bayar`, `createdAt`, `updatedAt`) VALUES
(2, 'KTR-1688838347919', '2023-07-09 00:00:00', 1, 25000, 125000, 100000, '2023-07-08 17:45:48', '2023-07-08 17:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `salesitem`
--

CREATE TABLE `salesitem` (
  `salesitemId` int(11) NOT NULL,
  `salesId` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salesitem`
--

INSERT INTO `salesitem` (`salesitemId`, `salesId`, `itemId`, `qty`, `createdAt`, `updatedAt`) VALUES
(2, 2, 1, 1, '2023-07-08 17:45:49', '2023-07-08 17:45:49'),
(3, 2, 2, 2, '2023-07-08 17:45:49', '2023-07-08 17:45:49');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230708162122-Item.js'),
('20230708162552-Customer.js'),
('20230708163007-Sales.js'),
('20230708164029-SalesItem.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`itemId`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`salesId`);

--
-- Indexes for table `salesitem`
--
ALTER TABLE `salesitem`
  ADD PRIMARY KEY (`salesitemId`),
  ADD KEY `salesId` (`salesId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `itemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `salesId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `salesitem`
--
ALTER TABLE `salesitem`
  MODIFY `salesitemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `salesitem`
--
ALTER TABLE `salesitem`
  ADD CONSTRAINT `salesitem_ibfk_1` FOREIGN KEY (`salesId`) REFERENCES `sales` (`salesId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
