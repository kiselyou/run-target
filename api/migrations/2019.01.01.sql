CREATE UNIQUE INDEX calendar_date_uindex ON calendar (date);

ALTER TABLE activity DROP FOREIGN KEY activity_target_id_fk;
ALTER TABLE activity DROP calendarId;