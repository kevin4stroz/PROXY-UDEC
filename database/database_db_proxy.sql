SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_proxy
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `db_proxy` ;

-- -----------------------------------------------------
-- Schema db_proxy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_proxy` DEFAULT CHARACTER SET utf8 ;
USE `db_proxy` ;

-- -----------------------------------------------------
-- Table `db_proxy`.`logs_squid`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_proxy`.`logs_squid` ;

CREATE TABLE IF NOT EXISTS `db_proxy`.`logs_squid` (
  `idlogs_squid` INT NOT NULL AUTO_INCREMENT,
  `user_agent` TEXT NOT NULL,
  `tcp_log` TEXT NOT NULL,
  `ip` TEXT NOT NULL,
  `fecha` TIMESTAMP NOT NULL,
  `metodo` TEXT NOT NULL,
  `url` TEXT NOT NULL,
  `res_codigo` INT NOT NULL,
  `size` INT NOT NULL,
  `redireccion` TEXT NOT NULL,
  `version_http` TEXT NOT NULL,
  PRIMARY KEY (`idlogs_squid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_proxy`.`dispositivo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_proxy`.`dispositivo` ;

CREATE TABLE IF NOT EXISTS `db_proxy`.`dispositivo` (
  `iddispositivo` INT NOT NULL AUTO_INCREMENT,
  `logs_squid_idlogs_squid` INT NOT NULL,
  `family` TEXT NOT NULL,
  `brand` TEXT NOT NULL,
  `model` TEXT NOT NULL,
  PRIMARY KEY (`iddispositivo`),
  CONSTRAINT `fk_dispositivo_logs_squid1`
    FOREIGN KEY (`logs_squid_idlogs_squid`)
    REFERENCES `db_proxy`.`logs_squid` (`idlogs_squid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_dispositivo_logs_squid1_idx` ON `db_proxy`.`dispositivo` (`logs_squid_idlogs_squid` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `db_proxy`.`sistema_operativo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_proxy`.`sistema_operativo` ;

CREATE TABLE IF NOT EXISTS `db_proxy`.`sistema_operativo` (
  `idsistema_operativo` INT NOT NULL AUTO_INCREMENT,
  `logs_squid_idlogs_squid` INT NOT NULL,
  `family` TEXT NOT NULL,
  `major` TEXT NOT NULL,
  `minor` TEXT NOT NULL,
  `patch` TEXT NOT NULL,
  `patch_minor` TEXT NOT NULL,
  PRIMARY KEY (`idsistema_operativo`),
  CONSTRAINT `fk_sistema_operativo_logs_squid1`
    FOREIGN KEY (`logs_squid_idlogs_squid`)
    REFERENCES `db_proxy`.`logs_squid` (`idlogs_squid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_sistema_operativo_logs_squid1_idx` ON `db_proxy`.`sistema_operativo` (`logs_squid_idlogs_squid` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `db_proxy`.`navegador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_proxy`.`navegador` ;

CREATE TABLE IF NOT EXISTS `db_proxy`.`navegador` (
  `idnavegador` INT NOT NULL AUTO_INCREMENT,
  `logs_squid_idlogs_squid` INT NOT NULL,
  `family` TEXT NOT NULL,
  `major` TEXT NOT NULL,
  `minor` TEXT NOT NULL,
  `patch` TEXT NOT NULL,
  PRIMARY KEY (`idnavegador`),
  CONSTRAINT `fk_navegador_logs_squid`
    FOREIGN KEY (`logs_squid_idlogs_squid`)
    REFERENCES `db_proxy`.`logs_squid` (`idlogs_squid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_navegador_logs_squid_idx` ON `db_proxy`.`navegador` (`logs_squid_idlogs_squid` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `db_proxy`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_proxy`.`usuario` ;

CREATE TABLE IF NOT EXISTS `db_proxy`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `usuario` TEXT NOT NULL,
  `clave` TEXT NOT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_proxy`.`logs_privoxy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_proxy`.`logs_privoxy` ;

CREATE TABLE IF NOT EXISTS `db_proxy`.`logs_privoxy` (
  `idlogs_privoxy` INT NOT NULL AUTO_INCREMENT,
  `ip` TEXT NULL,
  `fecha` TIMESTAMP NULL,
  `metodo` TEXT NULL,
  `url` TEXT NULL,
  `res_codigo` TEXT NULL,
  `size` TEXT NULL,
  `version_http` TEXT NULL,
  PRIMARY KEY (`idlogs_privoxy`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_proxy`.`country_ip`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_proxy`.`country_ip` ;

CREATE TABLE IF NOT EXISTS `db_proxy`.`country_ip` (
  `id_country_ip` INT NOT NULL AUTO_INCREMENT,
  `logs_privoxy_idlogs_privoxy` INT NULL,
  `logs_squid_idlogs_squid` INT NULL,
  `country` TEXT NOT NULL,
  `ip` TEXT NOT NULL,
  `lat` DECIMAL(10,8) NULL,
  `lon` DECIMAL(10,8) NULL,
  PRIMARY KEY (`id_country_ip`),
  CONSTRAINT `fk_country_ip_logs_privoxy1`
    FOREIGN KEY (`logs_privoxy_idlogs_privoxy`)
    REFERENCES `db_proxy`.`logs_privoxy` (`idlogs_privoxy`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_country_ip_logs_squid1`
    FOREIGN KEY (`logs_squid_idlogs_squid`)
    REFERENCES `db_proxy`.`logs_squid` (`idlogs_squid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_country_ip_logs_privoxy1_idx` ON `db_proxy`.`country_ip` (`logs_privoxy_idlogs_privoxy` ASC) VISIBLE;

CREATE INDEX `fk_country_ip_logs_squid1_idx` ON `db_proxy`.`country_ip` (`logs_squid_idlogs_squid` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `db_proxy`.`usuario`
  (`usuario`,
  `clave`)
VALUES
  ('admin_proxy',
  'e58aa7abb390a94dd05ab80eab2b3541'); -- e58aa7abb390a94dd05ab80eab2b3541:wxN0jK9pMHu1

INSERT INTO `db_proxy`.`usuario`
  (`usuario`,
  `clave`)
VALUES
  ('admin2_proxy',
  'e807f1fcf82d132f9bb018ca6738a19f'); -- e807f1fcf82d132f9bb018ca6738a19f:1234567890

