-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Dec 09. 13:00
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `sz_hubi`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diak`
--

CREATE TABLE `diak` (
  `Diak_ID` int(11) NOT NULL,
  `Diak_Neve` varchar(100) NOT NULL,
  `Diak_Osztaly` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `diak`
--

INSERT INTO `diak` (`Diak_ID`, `Diak_Neve`, `Diak_Osztaly`) VALUES
(1, 'Nagy Lajos', '9.A'),
(2, 'Kiss Anna', '10.B'),
(3, 'Szabó Péter', '11.C'),
(4, 'Tóth Eszter', '12.A'),
(5, 'Varga Bence', '11.A'),
(6, 'Horváth Dóra', '10.C'),
(7, 'Nagy Lajos', '9.A'),
(8, 'Kiss Anna', '10.B'),
(9, 'Szabó Péter', '11.C'),
(10, 'Tóth Eszter', '12.A'),
(11, 'Varga Bence', '11.A'),
(12, 'Horváth Dóra', '10.C');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kolcsonzes`
--

CREATE TABLE `kolcsonzes` (
  `Kolcsonzes_ID` int(11) NOT NULL,
  `Kolcsonzes_Ido` datetime NOT NULL,
  `Diak_ID` int(11) NOT NULL,
  `Konyv_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kolcsonzes`
--

INSERT INTO `kolcsonzes` (`Kolcsonzes_ID`, `Kolcsonzes_Ido`, `Diak_ID`, `Konyv_ID`) VALUES
(1, '2025-11-01 10:15:00', 1, 1),
(2, '2025-11-02 14:30:00', 2, 6),
(3, '2025-11-03 09:05:00', 3, 2),
(4, '2025-11-03 16:45:00', 1, 3),
(5, '2025-11-04 11:20:00', 4, 5),
(6, '2025-11-05 13:10:00', 5, 4),
(7, '2025-11-06 08:55:00', 6, 1),
(8, '2025-11-06 15:00:00', 3, 6),
(9, '2025-11-07 12:40:00', 2, 2),
(10, '2025-11-08 10:00:00', 4, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyv`
--

CREATE TABLE `konyv` (
  `Konyv_ID` int(11) NOT NULL,
  `Konyv_Cime` varchar(150) NOT NULL,
  `Konyv_Mufaj` varchar(50) NOT NULL,
  `Szerzo_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `konyv`
--

INSERT INTO `konyv` (`Konyv_ID`, `Konyv_Cime`, `Konyv_Mufaj`, `Szerzo_ID`) VALUES
(1, 'Vuk', 'Ifjúsági', 1),
(2, 'Tüskevár', 'Kaland', 1),
(3, 'Szent Péter esernyője', 'Regény', 2),
(4, 'Kincskereső kisködmön', 'Ifjúsági', 3),
(5, 'A kőszívű ember fiai', 'Történelmi', 4),
(6, 'Abigél', 'Regény', 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szerzo`
--

CREATE TABLE `szerzo` (
  `Szerzo_ID` int(11) NOT NULL,
  `Szerzo_Neve` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szerzo`
--

INSERT INTO `szerzo` (`Szerzo_ID`, `Szerzo_Neve`) VALUES
(1, 'Fekete István'),
(4, 'Jókai Mór'),
(2, 'Mikszáth Kálmán'),
(3, 'Móra Ferenc'),
(5, 'Szabó Magda');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `diak`
--
ALTER TABLE `diak`
  ADD PRIMARY KEY (`Diak_ID`),
  ADD KEY `idx_diak_osztaly` (`Diak_Osztaly`);

--
-- A tábla indexei `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD PRIMARY KEY (`Kolcsonzes_ID`),
  ADD KEY `idx_kolcsonzes_diak` (`Diak_ID`),
  ADD KEY `idx_kolcsonzes_konyv` (`Konyv_ID`),
  ADD KEY `idx_kolcsonzes_ido` (`Kolcsonzes_Ido`);

--
-- A tábla indexei `konyv`
--
ALTER TABLE `konyv`
  ADD PRIMARY KEY (`Konyv_ID`),
  ADD UNIQUE KEY `uq_konyv_cim_szerzo` (`Konyv_Cime`,`Szerzo_ID`),
  ADD KEY `idx_konyv_szerzo` (`Szerzo_ID`);

--
-- A tábla indexei `szerzo`
--
ALTER TABLE `szerzo`
  ADD PRIMARY KEY (`Szerzo_ID`),
  ADD UNIQUE KEY `uq_szerzo_nev` (`Szerzo_Neve`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `diak`
--
ALTER TABLE `diak`
  MODIFY `Diak_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  MODIFY `Kolcsonzes_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `konyv`
--
ALTER TABLE `konyv`
  MODIFY `Konyv_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `szerzo`
--
ALTER TABLE `szerzo`
  MODIFY `Szerzo_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD CONSTRAINT `fk_kolcsonzes_diak` FOREIGN KEY (`Diak_ID`) REFERENCES `diak` (`Diak_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kolcsonzes_konyv` FOREIGN KEY (`Konyv_ID`) REFERENCES `konyv` (`Konyv_ID`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `konyv`
--
ALTER TABLE `konyv`
  ADD CONSTRAINT `fk_konyv_szerzo` FOREIGN KEY (`Szerzo_ID`) REFERENCES `szerzo` (`Szerzo_ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
