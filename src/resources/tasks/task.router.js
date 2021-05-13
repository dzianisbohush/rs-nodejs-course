const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const boardsService = require('../boards/board.service');
const Task = require('./task.model');

/**
 * GET All tasks for particular board id
 */
router.route('/').get(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.boardId);

  if (!board) {
    res.status(404).end('Board not found');
  }

  const allTasks = await tasksService.getAll(req.params.boardId);

  if (allTasks) {
    res.status(200).send(allTasks.map(Task.toResponse));
  } else {
    res.status(404).end('Tasks not found');
  }
});

/**
 * Create (POST) new task
 */
router.route('/').post(async (req, res) => {
  const task = await tasksService.createTask(req.params.boardId, req.body);

  if (task) {
    res.status(200).send(Task.toResponse(task));
  } else {
    res.status(404).end('Task is not created');
  }
});

/**
 * GET Task by bord id and task id
 */
router.route('/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;

  const task = await tasksService.getTaskById(boardId, taskId);

  if (task) {
    res.status(200).send(Task.toResponse(task));
  } else {
    res.status(404).end('Task not found');
  }
});

/**
 * Update task (PUT)
 */
router.route('/:taskId').put(async (req, res) => {
  const {body, params : {boardId, taskId}} = req

  const task = await tasksService.updateTask(boardId, taskId, body);

  if(task) {
    res.status(200).send(Task.toResponse(task));
  } else {
    res.status(404).end("Task is not updated");
  }
});

/**
 * DELETE task by id
 */
router.route('/:taskId').delete(async (req, res) => {
  try {
    const {boardId, taskId} = req.params

    await tasksService.deleteTaskById(boardId, taskId);

    res.status(204).send('The task has been deleted');
  } catch (e) {
    res.status(404).end('Task is not deleted');
  }
});

module.exports = router;
