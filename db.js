const devConfig = require('./knexfile').development;
const knex = require('knex')(devConfig);

// knex.schema.dropTable('examples', (table) => {
//   table.increments();
//   table.string('name');
//   table.timestamps();
// }).then(() => {
//   console.log('TABLE DELETED!');
//   knex.destroy();
// });

knex('todos').where('id', 4).then((rows) => {
  const todo = rows[0];

  console.log(todo);
});

knex('todos').insert(
  {title: "TESTING 123",
   description: "HI THERE!"})
   .returning('*').then((rows) => {
  const todo = rows[0];

  console.log(todo);
});

knex('todos')
  .where('id', 2)
  .returning('*')
  .update({
    title: 'TEST NUMBER TWO',
    description: 'UPDATE TEST'
  })
  .then((rows) => {
    const todo = rows[0];

    console.log(todo);
  });
