
ALTER TABLE point ADD time FLOAT NULL;
ALTER TABLE point ADD speed FLOAT NULL;
ALTER TABLE distance ADD time FLOAT NOT NULL;
ALTER TABLE distance ADD avgSpeed FLOAT NOT NULL;

CREATE TABLE activity
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  dateTimeStart TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  dateTimeStop TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  calendarId INT NOT NULL,
  CONSTRAINT activity_target_id_fk FOREIGN KEY (calendarId) REFERENCES calendar (id)
);
CREATE UNIQUE INDEX activity_id_uindex ON activity (id);

ALTER TABLE distance ADD activityId INT NOT NULL;
ALTER TABLE distance ADD CONSTRAINT distance_activity_id_fk FOREIGN KEY (activityId) REFERENCES activity (id);
ALTER TABLE distance DROP FOREIGN KEY distance_target_id_fk;
ALTER TABLE distance DROP targetId;