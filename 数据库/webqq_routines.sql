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
-- Temporary view structure for view `vw_f`
--

DROP TABLE IF EXISTS `vw_f`;
/*!50001 DROP VIEW IF EXISTS `vw_f`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_f` AS SELECT 
 1 AS `id`,
 1 AS `userid`,
 1 AS `friendid`,
 1 AS `groupid`,
 1 AS `remark`,
 1 AS `signature`,
 1 AS `username`,
 1 AS `nickname`,
 1 AS `headshot`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_friendship`
--

DROP TABLE IF EXISTS `vw_friendship`;
/*!50001 DROP VIEW IF EXISTS `vw_friendship`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_friendship` AS SELECT 
 1 AS `id`,
 1 AS `userid`,
 1 AS `friendid`,
 1 AS `groupid`,
 1 AS `username`,
 1 AS `nickname`,
 1 AS `remark`,
 1 AS `headshot`,
 1 AS `signature`,
 1 AS `groupname`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_f`
--

/*!50001 DROP VIEW IF EXISTS `vw_f`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_f` AS select `f`.`id` AS `id`,`f`.`userid` AS `userid`,`f`.`friendid` AS `friendid`,`f`.`groupid` AS `groupid`,`f`.`remark` AS `remark`,`u`.`signature` AS `signature`,`u`.`username` AS `username`,`u`.`nickname` AS `nickname`,`u`.`headshot` AS `headshot` from (`tb_friendship` `f` join `tb_user` `u` on((`f`.`friendid` = `u`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_friendship`
--

/*!50001 DROP VIEW IF EXISTS `vw_friendship`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_friendship` AS select `vw_f`.`id` AS `id`,`vw_f`.`userid` AS `userid`,`vw_f`.`friendid` AS `friendid`,`vw_f`.`groupid` AS `groupid`,`vw_f`.`username` AS `username`,`vw_f`.`nickname` AS `nickname`,`vw_f`.`remark` AS `remark`,`vw_f`.`headshot` AS `headshot`,`vw_f`.`signature` AS `signature`,`g`.`groupname` AS `groupname` from (`vw_f` join `tb_group` `g` on((`vw_f`.`groupid` = `g`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-22  9:31:04
