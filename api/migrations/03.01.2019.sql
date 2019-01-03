
CREATE INDEX activity_dateTimeStart_index ON activity (dateTimeStart);
ALTER TABLE activity ADD deviceId int NULL;
ALTER TABLE activity ADD CONSTRAINT activity_device_id_fk FOREIGN KEY (deviceId) REFERENCES device(id);