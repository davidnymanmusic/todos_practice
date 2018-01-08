exports.up = function(knex, Promise) {
knex.schema.createTable('create_contacts_table', (table) =>{
  table.increments('id');
  table.string('email').unique();
  table.string('phone_number', 10);
}).then(() => {
  console.log('TABLE CREATED!');
  knex.destroy();
});
};
exports.down = function(knex, Promise) {
  knex.schema.dropTable('create_contacts_table')
  .then(()=>{
    console.log('table DELETED');
    knex.destroy();
  });
};
