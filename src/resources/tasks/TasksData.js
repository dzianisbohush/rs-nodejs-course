const faker = require('faker')
const { BOARDS } = require('../boards/BoardData');
const { USERS } = require('../users/UsersData');
const Task = require('./task.model');

const TASKS = Array(10).fill(null).map((_, idx) => {
  const board = BOARDS[faker.helpers.randomize([0,1])]

  return new Task({
    title: `task_title_${idx}`,
    order: idx,
    description: `task_description_${idx}`,
    userId: USERS[faker.helpers.randomize([0,1,2])].id,
    boardId: board.id,
    columnId: board.columns[faker.helpers.randomize([0,1])].id
  })
})

exports.TASKS = TASKS;
