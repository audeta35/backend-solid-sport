ALTER TABLE competition RENAME TO `match` 
ALTER TABLE `result` ADD `id_atlet` INT(11) NOT NULL AFTER `id_user`;
ALTER TABLE `result` CHANGE `technical_result` `technical_result` DOUBLE NOT NULL; 
ALTER TABLE `result` CHANGE `athletic_result` `athletic_result` DOUBLE NOT NULL; 