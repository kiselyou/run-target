ALTER TABLE activity ADD type int DEFAULT 1 NOT NULL COMMENT '1 - Generated by GPS location 2 - Generated by activity form';

ALTER TABLE distance MODIFY pathLength float NOT NULL;
ALTER TABLE distance MODIFY avgSpeed float;