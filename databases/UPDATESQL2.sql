ALTER TABLE points DROP id_result
ALTER TABLE `points` ADD `id_match` INT NOT NULL AFTER `id_atlet`; 
ALTER TABLE `points` ADD INDEX(`id_match`); 
ALTER TABLE `points` CHANGE `total_point` `total_point` DOUBLE NOT NULL; 