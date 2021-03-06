
UPDATE sysconfig SET config = '<?xml version="1.0" encoding="UTF-8"?>
<Params>
	<Param name="urlStyle">classic</Param>
	<Param name="hypertextEditor">fckeditor</Param>
	<SpecialPages>
		<Param name="notFoundPageCode">notfound</Param>
		<Param name="homePageCode">homepage</Param>
		<Param name="errorPageCode">errorpage</Param>
		<Param name="loginPageCode">login</Param>
	</SpecialPages>
	<ExtendendPrivacyModule>
		<Param name="extendedPrivacyModuleEnabled">false</Param>
		<Param name="maxMonthsSinceLastAccess">6</Param>
		<Param name="maxMonthsSinceLastPasswordChange">3</Param>
	</ExtendendPrivacyModule>
	<Versioning>
		<Param name="jpversioning_deleteMidVersions">true</Param>
	</Versioning>
</Params>
' WHERE item = 'params';




CREATE TABLE `jpversioning_versionedcontents` (
  `id` int(11) NOT NULL,
  `contentid` varchar(16) NOT NULL,
  `contenttype` varchar(30) NOT NULL,
  `descr` varchar(100) NOT NULL,
  `status` varchar(12) NOT NULL,
  `xml` longtext NOT NULL,
  `versiondate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `version` varchar(7) NOT NULL,
  `onlineversion` int(11) NOT NULL,
  `approved` smallint(6) NOT NULL,
  `username` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contentid` (`contentid`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




CREATE TABLE `jpversioning_trashedresources` (
  `resid` varchar(16) NOT NULL,
  `restype` varchar(30) NOT NULL,
  `descr` varchar(100) NOT NULL,
  `maingroup` varchar(20) NOT NULL,
  `resxml` longtext NOT NULL,
  PRIMARY KEY (`resid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
