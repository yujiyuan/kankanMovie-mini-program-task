CREATE TABLE `collectionReviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11)  NULL,
  `title` varchar(255)  NULL,
  `image` varchar(255)  NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userName` varchar(255)  NULL,
  `content` varchar(255)  NULL,
  `user` varchar(255)  NULL,
  `tempFilePath` varchar(255)  NULL,
  `avatar` varchar(255)  NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET @IMAGE_BASE_URL = "https://kankanmovie-1257514261.cos.ap-guangzhou.myqcloud.com/"; -- FOR EXAMPLE: https://*****.ap-shanghai.myqcloud.com/

