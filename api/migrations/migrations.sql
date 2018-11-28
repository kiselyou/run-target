CREATE TABLE calendar
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  dateStart DATETIME,
  dateEnd DATETIME,
  deviceId VARCHAR(50),
  days JSON,
  category SMALLINT
);
CREATE UNIQUE INDEX calendar_id_uindex ON calendar (id);