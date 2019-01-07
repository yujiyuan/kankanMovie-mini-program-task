-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-01-07 06:48:16
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cAuth`
--

-- --------------------------------------------------------

--
-- 表的结构 `reviewList`
--

CREATE TABLE `reviewList` (
  `id` int(11) NOT NULL COMMENT '电影id',
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户ID',
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户名',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `tempFilePath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '录音文件地址',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '影评内容',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `review_id` int(11) NOT NULL COMMENT '影评id',
  `duration` int(11) DEFAULT NULL COMMENT '录音时长',
  `image` varchar(255) NOT NULL COMMENT '电影海报',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `reviewList`
--

INSERT INTO `reviewList` (`id`, `user`, `userName`, `avatar`, `tempFilePath`, `content`, `create_time`, `review_id`, `duration`, `image`, `title`) VALUES
(7, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'null', '在V型都是根深蒂固', '2019-01-06 15:47:42', 12, 0, 'https://kankanmovie-1257514261.cos.ap-guangzhou.myqcloud.com/p452582315.jpg', '爱在黎明破晓前'),
(6, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'null', '是的使得公司的根深蒂固', '2019-01-06 19:58:15', 13, 0, 'https://kankanmovie-1257514261.cos.ap-guangzhou.myqcloud.com/p449619623.jpg', '热血警探');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reviewList`
--
ALTER TABLE `reviewList`
  ADD PRIMARY KEY (`review_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `reviewList`
--
ALTER TABLE `reviewList`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '影评id', AUTO_INCREMENT=14;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
