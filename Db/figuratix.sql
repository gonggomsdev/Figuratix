-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS figuratix
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE figuratix;

-- --------------------------------------------------------
-- Tabla: figuras
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `figuras` (
  `id_figura` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `cantidad_stock` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `precio` decimal(10,2) NOT NULL DEFAULT 0.00,
  `disponibilidad` enum('preorder','inventario','fuera') NOT NULL DEFAULT 'inventario',
  `descripcion` text DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `fecha` date NOT NULL DEFAULT curdate(),
  `foto_detalle` varchar(255) DEFAULT NULL,
  `foto_detalle2` varchar(255) DEFAULT NULL,
  `foto_detalle3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_figura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Datos de ejemplo para figuras
-- --------------------------------------------------------
INSERT INTO `figuras` (`id_figura`, `nombre`, `cantidad_stock`, `precio`, `disponibilidad`, `descripcion`, `foto`, `fecha`, `foto_detalle`, `foto_detalle2`, `foto_detalle3`) VALUES
(1, 'Monika White Dress Ver.', 0, 56.57, 'preorder', 'Figura de Monika de Doki Doki Literature Club! en su vestido blanco. Esculpida por Takeuchi Kenkyusei y fabricada por Good Smile Company. Altura aproximada: 18 cm. Materiales: PVC y ABS. Incluye base para exhibición.', 'MonikaWD.png', '2025-10-09', 'MonikaWD-detalle.png', 'MonikaWD-detalle2.png', 'MonikaWD-detalle3.png'),
(2, 'Rem Original Outfit', 5, 49.99, 'inventario', 'Figura de Rem de Re:Zero en su traje original. Altura aproximada: 16 cm. Materiales: PVC y ABS. Incluye base para exhibición.', 'RemOriginal.png', '2025-10-08', 'RemOriginal-detalle.png', 'RemOriginal-detalle2.png', 'RemOriginal-detalle3.png'),
(3, 'Rei L Size', 3, 62.50, 'inventario', 'Figura de Rei Ayanami de Evangelion, serie L Size. Altura aproximada: 18 cm. Materiales: PVC y ABS. Incluye base para exhibición.', 'ReiLHV.png', '2025-10-10', 'ReiLHV-detalle.png', 'ReiLHV-detalle2.png', 'ReiLHV-detalle3.png'),
(4, 'Reincarnation Racing Miku 2013 Ver.', 7, 65.00, 'inventario', 'Figura de Racing Miku 2013 Ver. Fabricada por Good Smile Company. Altura aproximada: 17 cm. Materiales: PVC y ABS. Incluye base para exhibición.', 'MikuReinV.png', '2025-10-11', 'MikuReinV-detalle.png', 'MikuReinV-detalle2.png', 'MikuReinV-detalle3.png'),
(5, 'POP UP PARADE Lucy L Size', 4, 45.00, 'inventario', 'Figura de Lucy de POP UP PARADE L Size. Altura aproximada: 15 cm. Materiales: PVC y ABS. Incluye base para exhibición.', 'LucyEDGL.png', '2025-10-12', 'LucyEDGL-detalle.png', 'LucyEDGL-detalle2.png', 'LucyEDGL-detalle3.png'),
(6, 'POP UP PARADE SP Albedo Jet Black Dress Ver.', 0, 60.00, 'preorder', 'Figura de Albedo con vestido negro, POP UP PARADE SP. Altura aproximada: 18 cm. Materiales: PVC y ABS. Incluye base para exhibición.', 'AlbedoBD.png', '2025-10-13', 'AlbedoBD-detalle.png', 'AlbedoBD-detalle2.png', 'AlbedoBD-detalle3.png'),
(7, 'POP UP PARADE SP Belle', 0, 75.00, 'preorder', 'Figura de Belle del videojuego Zenless Zone Zero, serie POP UP PARADE SP. Altura: 17.7 cm. Material: PVC. Incluye base.', 'BelleZZZ.png', '2025-10-14', 'BelleZZZ-detalle.png', 'BelleZZZ-detalle2.png', 'BelleZZZ-detalle3.png'),
(8, 'Shinpei Ajiro', 0, 16.80, 'preorder', 'Figura de Shinpei Ajiro de la serie Summer Time Rendering, escala 1/7. Fabricada por Good Smile Company. Altura aproximada: 26 cm. Material: PVC. Incluye base con motivo de playa.', 'ShinpeiSR.png', '2025-10-15', 'ShinpeiSR-detalle.png', 'ShinpeiSR-detalle2.png', 'ShinpeiSR-detalle3.png'),
(9, 'POP UP PARADE Frieren Blow Kiss Ver.', 0, 45.00, 'preorder', 'Figura de Frieren de POP UP PARADE en la pose Blow Kiss. Fabricada por Good Smile Company. Altura aproximada: 16 cm. Materiales: PVC y ABS. Incluye base para exhibición.', 'FrierenBK.png', '2025-10-16', 'FrierenBK-detalle.png', 'FrierenBK-detalle2.png', 'FrierenBK-detalle3.png'),
(10, 'POP UP PARADE A2 (YoRHa Type A No. 2)', 0, 52.99, 'preorder', 'Figura de A2 del videojuego NieR:Automata, serie POP UP PARADE. Esculpida por Koji Nihashi. Altura aproximada: 17 cm. Materiales: PVC. Incluye base para exhibición.', 'A2F1.png', '2025-10-24', 'A2F1-detalle.png', 'A2F1-detalle2.png', 'A2F1-detalle3.png'),
(11, 'POP UP PARADE 2B (YoRHa No.2 Type B)', 0, 45.00, 'inventario', 'Figura de 2B del videojuego NieR:Automata, serie POP UP PARADE. Materiales: PVC. Incluye base para exhibición.', '2B1P.png', '2025-10-24', '2B1P-detalle.png', '2B1P-detalle2.png', '2B1P-detalle3.png'),
(12, 'POP UP PARADE 9S (YoRHa No.9 Type S)', 0, 45.00, 'preorder', 'Figura de 9S del videojuego NieR:Automata, serie POP UP PARADE. Materiales: PVC. Incluye base para exhibición.', '9S1P.png', '2025-10-24', '9S1P-detalle.png', '9S1P-detalle2.png', '9S1P-detalle3.png'),
(13, 'POP UP PARADE Speed-o\'-Sound Sonic', 0, 45.00, 'inventario', 'Figura de Speed-o\'-Sound Sonic, serie POP UP PARADE. Materiales: PVC. Incluye base para exhibición.', 'SpeedO.png', '2025-10-24', 'SpeedO-detalle.png', 'SpeedO-detalle2.png', 'SpeedO-detalle3.png'),
(14, 'POP UP PARADE Yuno Gasai: Limited Ver.', 0, 45.00, 'inventario', 'Figura de Yuno Gasai edición limitada, serie POP UP PARADE. Materiales: PVC. Incluye base para exhibición.', 'YunoSpecial.png', '2025-10-24', 'YunoSpecial-detalle.png', 'YunoSpecial-detalle2.png', 'YunoSpecial-detalle3.png'),
(15, 'POP UP PARADE Aqua', 0, 45.00, 'inventario', 'Figura de Aqua de POP UP PARADE. Materiales: PVC. Incluye base para exhibición.', 'AquaP.png', '2025-10-24', 'AquaP-detalle.png', 'AquaP-detalle2.png', 'AquaP-detalle3.png'),
(16, 'POP UP PARADE Rimuru', 0, 45.00, 'preorder', 'Figura de Rimuru de POP UP PARADE. Materiales: PVC. Incluye base para exhibición.', 'RimuruP.png', '2025-10-24', 'RimuruP-detalle.png', 'RimuruP-detalle2.png', 'RimuruP-detalle3.png'),
(17, 'POP UP PARADE Shizu Bunny Ver.', 0, 45.00, 'inventario', 'Figura de Shizu Bunny Ver. de POP UP PARADE. Materiales: PVC. Incluye base para exhibición.', 'ShizuWB.png', '2025-10-24', 'ShizuWB-detalle.png', 'ShizuWB-detalle2.png', 'ShizuWB-detalle3.png'),
(18, 'Snow Miku x Kuromi', 9, 149.72, 'preorder', 'De «Character Vocal Series 01: Hatsune Miku» llega una figura a escala de Snow Miku x Kuromi, diseñada por el ilustrador PiPi. El elegante y adorable diseño colaborativo, con un traje teñido de negro por la traviesa Kuromi, ha sido meticulosamente recreado en forma de figura. Las partes translúcidas se incorporan a las coletas de Miku, mientras que los colores de la pintura nacarada cambian con el ángulo de la luz, lo que da como resultado un acabado encantador y caprichoso. Posando como si estuviera contemplando un deslumbrante campo nevado, esta versión única de Snow Miku sería una maravillosa adición a cualquier colección.', 'SnowMikuK.png', '2025-11-06', 'SnowMikuK-detalle.png', 'SnowMikuK-detalle2.png', 'SnowMikuK-detalle3.png');

-- --------------------------------------------------------
-- Tabla: usuarios
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` enum('admin','cliente') DEFAULT 'cliente',
  `email` varchar(100) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Datos de ejemplo para usuarios
-- --------------------------------------------------------
INSERT INTO `usuarios` (`id_usuario`, `usuario`, `contrasena`, `rol`, `email`, `fecha_registro`) VALUES
(1, 'admin', '$2y$10$yRZ13W0OoH6V5lQOc4QqMeJgaz4d5yBk7ucYpV1TJ.xrjierSA14a', 'admin', 'admin@gmail.com', '2025-11-07 09:31:14'),
(2, 'Ramon', '$2y$10$eZzwDaYHlDIIMl4QvIsVTexnuqq8DCUDw66MN1luPIx0amRLAjqyy', 'cliente', 'test@test.es', '2025-11-07 12:30:54');

COMMIT;
