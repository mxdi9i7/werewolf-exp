
exports.up = function(knex, Promise) {
  return knex.raw(
  `CREATE TABLE users (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  username text,
  password text,
  is_admin int(1) DEFAULT 0,
  nickname text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  rsvp text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  clickCount int(11) DEFAULT 0,
  profilePic text,
  auth_provider text,
  auth_id text,
  gender text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=12321 DEFAULT CHARSET=latin1;`
)
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
