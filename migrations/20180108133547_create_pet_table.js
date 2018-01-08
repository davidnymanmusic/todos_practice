exports.up = function(knex, Promise) {
knex.schema.createTable('create_pets_table', (table) =>{
  table.increments('id');
  table.timestamps('timestamps');
  table.string('name');
  table.integer('age');
}).then(() => {
  console.log('TABLE CREATED!');
  knex.destroy();
});
};
exports.down = function(knex, Promise) {
  knex.schema.dropTable('create_pets_table')
  .then(()=>{
    console.log('table DELETED');
    knex.destroy();
  });
};
