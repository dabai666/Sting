-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webqq
-- ------------------------------------------------------
-- Server version	5.7.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `headshot` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `mobile` varchar(11) DEFAULT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  `online` tinyint(4) DEFAULT NULL,
  `signature` varchar(200) DEFAULT '这个人很懒什么也没写',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,'a123456','e10adc3949ba59abbe56e057f20f883e','','\\userhead\\upload_da3555037333a552c6d872cdbd62daa1.jpg','','',0,NULL,''),(2,'a01','7c4a8d09ca3762af61e59520943dc26494f8941b','a01','/userhead/upload_44eac1ac375f74b6c525dfcacb97f869.jpg',NULL,NULL,NULL,NULL,'这个人很懒什么也没写'),(3,'a02','7c4a8d09ca3762af61e59520943dc26494f8941b','a02','/userhead/upload_710c4b2b2ad0484cc211f8434f57f6db.jpg',NULL,NULL,NULL,NULL,'这个人很懒什么也没写'),(4,'a03','7c4a8d09ca3762af61e59520943dc26494f8941b','a03','/userhead/upload_44eac1ac375f74b6c525dfcacb97f869.jpg',NULL,NULL,NULL,NULL,'这个人很懒什么也没写'),(5,'a04','7c4a8d09ca3762af61e59520943dc26494f8941b','a04','/userhead/upload_710c4b2b2ad0484cc211f8434f57f6db.jpg',NULL,NULL,NULL,NULL,'这个人很懒什么也没写'),(6,'a05','7c4a8d09ca3762af61e59520943dc26494f8941b','a05','/userhead/upload_44eac1ac375f74b6c525dfcacb97f869.jpg',NULL,NULL,NULL,NULL,'这个人很懒什么也没写'),(7,'a06','7c4a8d09ca3762af61e59520943dc26494f8941b','a06','/userhead/upload_44eac1ac375f74b6c525dfcacb97f869.jpg',NULL,NULL,NULL,NULL,'这个人很懒什么也没写'),(8,'guapi','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,NULL,'这个人很懒什么也没写'),(9,'xiaoyezi','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,NULL,NULL,NULL,NULL,'这个人很懒什么也没写'),(10,'xz123','e10adc3949ba59abbe56e057f20f883e','小白','\\userhead\\upload_6f92838793cf837c3116de5a36a0acf8.png','1121@qq.com','13555',0,NULL,'加我'),(13,'xz12','e10adc3949ba59abbe56e057f20f883e','大黑','\\userhead\\upload_081ec70f04ddab5ec86f424ab63094ef.jpg','','',0,NULL,'232323'),(14,'www','e10adc3949ba59abbe56e057f20f883e','测试1','\\userhead\\upload_5c290c72a59d129127c2b78271a905a2.jpg','xzx@qq.com','13566210062',1,NULL,'哈哈哈哈'),(15,'www1','e10adc3949ba59abbe56e057f20f883e','','\\userhead\\upload_0ded09a4037d2b0fcc20792f47ece92c.jpg','','',0,NULL,'');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-22  9:31:01
