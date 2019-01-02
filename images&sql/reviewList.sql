CREATE TABLE `reviewList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) SET utf8 DEFAULT NULL,
  `content` varchar(255) SET utf8 DEFAULT NULL,
  `user` varchar(255) SET utf8 DEFAULT NULL,
  `tempFilePath` varchar(255) SET utf8 DEFAULT NULL,
  `avatar` varchar(255) SET utf8 DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET @IMAGE_BASE_URL = "https://kankanmovie-1257514261.cos.ap-guangzhou.myqcloud.com/"; -- FOR EXAMPLE: https://*****.ap-shanghai.myqcloud.com/

