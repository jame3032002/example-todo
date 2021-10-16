const router = require('express').Router()

const Task = require('../../models/Task')

router.get('/', async (_, res) => {
  const tasks = await Task.find({})

  return res.status(200).json({ success: true, tasks })
})

router.get('/:taskID', async (req, res) => {
  const { taskID } = req.params
  const task = await Task.findOne({ _id: taskID })

  if (!task) {
    return res.status(404).json({ success: false, error: 'Invalid task id' })
  }

  return res.status(200).json({ success: true, task })
})

router.post('/', async (req, res) => {
  const { task: todo } = req.body
  const task = await Task.create({ task: todo, status: 'pending' })

  return res.status(201).json({ success: true, task })
})

router.delete('/status', async (_, res) => {
  await Task.deleteMany({ status: 'delete' })

  return res.status(200).json({ success: true })
})

router.patch('/:taskID', async (req, res) => {
  const { taskID } = req.params
  const { status } = req.body
  const task = await Task.findOneAndUpdate({ _id: taskID }, { $set: { status } }, { new: true })

  if (!task) {
    return res.status(404).json({ success: false, error: 'Invalid task id' })
  }

  return res.status(200).json({ success: true, task })
})

module.exports = router
