
/*-----------------------------------------------------------------------------------------*/
CREATE  TABLE `cainsa`.`materiales` (
  `codigoMaterial` VARCHAR(45) NOT NULL ,
  `nombre` VARCHAR(45) NULL ,
  `descripcion` VARCHAR(45) NULL ,
  PRIMARY KEY (`codigoMaterial`) );


INSERT INTO `cainsa`.`materiales` (`codigoMaterial`, `nombre`, `descripcion`) VALUES ('1', 'Brocha', 'brocha gorda');
INSERT INTO `cainsa`.`materiales` (`codigoMaterial`, `nombre`, `descripcion`) VALUES ('2', 'brocha', 'brocha pequeña');
INSERT INTO `cainsa`.`materiales` (`codigoMaterial`, `nombre`, `descripcion`) VALUES ('3', 'lentes blancos', 'lentes transparentes blancos');
INSERT INTO `cainsa`.`materiales` (`codigoMaterial`, `nombre`, `descripcion`) VALUES ('4', 'lentes negros', 'negros');
INSERT INTO `cainsa`.`materiales` (`codigoMaterial`, `nombre`, `descripcion`) VALUES ('5', 'guantes', 'de carretilla xD');
INSERT INTO `cainsa`.`materiales` (`codigoMaterial`, `nombre`, `descripcion`) VALUES ('6', 'guantes', 'nitrilo');


/* -----------------------------------------------------------------------------------------*/
CREATE TABLE `uso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `codigoMaterial` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;



INSERT INTO `cainsa`.`uso` (`id`, `fecha`, `cantidad`, `codigoMaterial`) VALUES ('1', '2018-06-30', '20', '2');
INSERT INTO `cainsa`.`uso` (`id`, `fecha`, `cantidad`, `codigoMaterial`) VALUES ('2', '2018-06-30', '20', '3');
INSERT INTO `cainsa`.`uso` (`id`, `fecha`, `cantidad`, `codigoMaterial`) VALUES ('3', '2018-06-30', '20', '4');
INSERT INTO `cainsa`.`uso` (`id`, `fecha`, `cantidad`, `codigoMaterial`) VALUES ('4', '2018-06-30', '20', '1');
INSERT INTO `cainsa`.`uso` (`id`, `fecha`, `cantidad`, `codigoMaterial`) VALUES ('5', '2018-06-30', '20', '4');
INSERT INTO `cainsa`.`uso` (`id`, `fecha`, `cantidad`, `codigoMaterial`) VALUES ('6', '2018-06-30', '20', '5');