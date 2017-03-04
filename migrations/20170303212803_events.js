
exports.up = function(knex, Promise) {
  return knex.raw(`
  	CREATE TABLE events (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  type char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  date text COLLATE utf8mb4_unicode_ci,
  currentFill int(11) DEFAULT NULL,
  capacity int(11) DEFAULT NULL,
  address text COLLATE utf8mb4_unicode_ci,
  note text COLLATE utf8mb4_unicode_ci,
  user_id int(11) unsigned DEFAULT NULL,
  user_nickname text COLLATE utf8mb4_unicode_ci,
  participants text COLLATE utf8mb4_unicode_ci,
  participantsID text COLLATE utf8mb4_unicode_ci,
  clickCount int(11) DEFAULT NULL,
  filePath text COLLATE utf8mb4_unicode_ci,
  host_profile text COLLATE utf8mb4_unicode_ci,
  is_available int(11) DEFAULT '1',
  admission text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (id),
  UNIQUE KEY id (id),
  KEY user_id (user_id),
  CONSTRAINT events_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `)
};

exports.down = function(knex, Promise) {
  	 return knex.schema.dropTable('events')
};
