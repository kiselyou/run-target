
ALTER TABLE distance CHANGE pathLength pathLength FLOAT;
ALTER TABLE distance CHANGE prevDistanceUKey prevUKey varchar(50);
ALTER TABLE distance CHANGE distanceNumber number smallint(6);
ALTER TABLE distance ADD elapsedTime FLOAT NULL;
ALTER TABLE point CHANGE prevPointUKey prevUKey VARCHAR(50);