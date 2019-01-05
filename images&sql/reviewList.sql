-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-01-05 12:43:13
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


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

CREATE TABLE `reviewList`
(
  `id` int
(11) NOT NULL COMMENT '电影id',
  `user` varchar
(255) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户ID',
  `userName` varchar
(255) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户名',
  `avatar` varchar
(255) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `tempFilePath` varchar
(255) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '录音文件地址',
  `content` varchar
(255) CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '影评内容',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `review_id` int
(11) NOT NULL COMMENT '影评id',
  `duration` int
(11) DEFAULT NULL COMMENT '录音时长'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `reviewList`
--

INSERT INTO `reviewList` (`
id`,
`user`,
`userName
`, `avatar`, `tempFilePath`, `content`, `create_time`, `review_id`, `duration`) VALUES
(15, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'null', '峰会上发挥煽风点火', '2019-01-03 14:48:54', 1, 0),
(14, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'wxfile://tmp_800d68b4389d4ac730ed5258232e89a3.mp3', 'null', '2019-01-03 14:50:56', 2, 6),
(8, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'null', '第三方 ', '2019-01-03 21:08:47', 3, 0),
(12, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'null', '在徐校长备注不在徐州', '2019-01-03 21:14:33', 4, 0),
(14, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'http://tmp/wx96858677bd48de2d.o6zAJs3Gm3x7ECvqjYRp78sgW0Lo.Say5S2pDCHnE4731a059e8004277ac01c4a88026e888.durationTime=6021.mp3', 'null', '2019-01-03 22:52:30', 5, 6),
(14, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'http://tmp/wx96858677bd48de2d.o6zAJs3Gm3x7ECvqjYRp78sgW0Lo.Say5S2pDCHnE4731a059e8004277ac01c4a88026e888.durationTime=6021.mp3', 'null', '2019-01-03 22:52:54', 6, 6),
(15, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'http://tmp/wx96858677bd48de2d.o6zAJs3Gm3x7ECvqjYRp78sgW0Lo.AeeuJ3UcN1ED296c158311c821f3d0c1cf0179ca4e9a.durationTime=4658.mp3', 'null', '2019-01-03 23:02:51', 7, 5),
(2, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'wxfile://tmp_6f9a67c44af4f75438118cc47680ede2.mp3', 'null', '2019-01-03 23:04:48', 8, 2),
(14, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'null', '阿斯顿撒多', '2019-01-04 11:23:59', 9, 0),
(3, 'oa8nD5FhbcFdfYFE69mhyA-_09rY', '修', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epZHOYR1KfVr1qrQYuTrBFrtzKCxkjkOd4yHfWxhCOSjJb8IlRLVjgtE1n0PiazfopcMOd8NcQn26g/132', 'null', 'vxbxbxcxc', '2019-01-04 16:53:48', 10, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reviewList`
--
ALTER TABLE `reviewList`
ADD PRIMARY KEY
(`review_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `reviewList`
--
ALTER TABLE `reviewList`
  MODIFY `review_id` int
(11) NOT NULL AUTO_INCREMENT COMMENT '影评id', AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
