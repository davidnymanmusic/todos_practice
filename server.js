const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// **** SETUP DATABASE ****
const devConfig = require('./knexfile').development;
const knex = require('knex')(devConfig);

const app = express();
const PORT = 8000;

app.use(morgan('combined'));
app.use(bodyParser.json()); // to parse JSON


/*
  GET ALL TODOS
*/
app.get('/todos', (req, res) => {
  knex('todos').then((rows) =>  res.json(rows));
});

/*
  CREATE A TODO
*/
app.post('/todos', (req, res) => {
  const { title, description } = req.body;

  const newTodo = {
    title,
    description
  };

  knex('todos')
    .insert(newTodo) // INSERTS A NEW TODO
    .returning('*')
    .then((rows) => {
      const todo = rows[0];

      res.json(todo);
    });
});

/*
  FETCH A TODO
*/
app.get('/todos/:todo_id', (req, res) => {
  const todoId = req.params.todo_id;

  knex('todos')
  .where('id', todoId) // look for todo_id
  .then((rows) => {
    const foundTodo = rows[0];

    res.json(foundTodo);
  })
  .catch(() => {
    res.sendStatus(404);
  });
});

/*
  PATCH A TODO
*/
app.patch('/todos/:todo_id', (req, res) => {
  const todoId = req.params.todo_id;
  const { title, description } = req.body;

  knex('todos')
    .where('id', todoId)
    .returning('*')
    .update({ title, description })
    .then((rows) => {
      const todo = rows[0];

      res.json(todo);
    })
    .catch(() => {
      res.sendStatus(400);
    })
});

/*
  DELETE A TODO
*/
app.delete('/todos/:todo_id', (req, res) => {
  knex('todos')
    .where('id', req.params.todo_id)
    .del()
    .then(() => res.sendStatus(204));
});

app.listen(PORT, () => console.log('Listening on', PORT, "http://localhost:8000"))
