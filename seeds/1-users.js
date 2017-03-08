
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
        // Inserts seed entries
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          username: 'peter.zheng88228@gmail.com',
          password: '123',
          is_admin: 1,
          nickname: 'peter哥哥',
          rsvp: '',
          clickCount: 19,
          profilePic: 'profilePic/default.jpg',
          auth_provider: null,
          auth_id: null,
          gender: 'male'
        }),
        knex('users').insert({
          id: 2,
          username: 'chuxu@gmail.com',
          password: '123',
          is_admin: 0,
          nickname: 'chuxu',
          rsvp: '',
          clickCount: 19,
          profilePic: 'profilePic/default.jpg',
          auth_provider: null,
          auth_id: null,
          gender: 'male'
        }),
        knex('users').insert({
          id: 3,
          username: 'test@gmail.com',
          password: '123',
          is_admin: 0,
          nickname: '申屠',
          rsvp: '',
          clickCount: 19,
          profilePic: 'profilePic/default.jpg',
          auth_provider: null,
          auth_id: null,
          gender: 'male'
        })
      ]);
};
