
CREATE DATABASE run CHARACTER SET utf8 COLLATE utf8_general_ci;

/*
DROP TABLE calendar;
DROP TABLE target;
DROP TABLE device;
DROP TABLE user;
*/

CREATE TABLE user
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(50),
  name VARCHAR(50)
);
CREATE UNIQUE INDEX user_id_uindex ON user (id);

CREATE TABLE device
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userId INT NULL,
  deviceKey VARCHAR(50)
);

CREATE UNIQUE INDEX device_id_uindex ON device (id);
CREATE UNIQUE INDEX device_deviceKey_uindex ON device (deviceKey);
ALTER TABLE device ADD CONSTRAINT device_user_id_fk FOREIGN KEY (userId) REFERENCES user (id);

CREATE TABLE target
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  deviceId INT NOT NULL,
  startDate DATE NOT NULL,
  startKm INT NOT NULL,
  targetKm INT NOT NULL,
  options JSON NOT NULL
);
CREATE UNIQUE INDEX target_id_uindex ON target (id);
ALTER TABLE target ADD CONSTRAINT target_device_id_fk FOREIGN KEY (deviceId) REFERENCES device (id);

CREATE TABLE calendar
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  targetId INT NOT NULL,
  date DATE NOT NULL,
  enabled BOOLEAN,
  options JSON
);
CREATE UNIQUE INDEX calendar_id_uindex ON calendar (id);
ALTER TABLE calendar ADD CONSTRAINT calendar_target_id_fk FOREIGN KEY (targetId) REFERENCES target (id);