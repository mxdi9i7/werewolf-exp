
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('events').del(),
    knex('users').del()
    );
};
