/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addTask: async (req, res) => {
    try {
      // const userid = req.params.userid;
      const { data, userid } = req.body;
      const newTask = await Task.create({
        data,
        userid,
      }).fetch();

      return res
        .status(200)
        .json({ success: true, msg: 'Task added succssfully', newTask });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  getAllTask: async (req, res) => {
    try {
      const userid = req.params.id;
      const getTask = await Task.find({ userid });

      return res.status(200).send({
        message: 'All tasks are',
        getTask,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  toggleTaskDone: async (req, res) => {
    try {
      const taskRef = await Task.findOne({ id: req.params.id });

      await Task.updateOne({ id: req.params.id }).set({ done: !taskRef.done });
      return res.status(200).send({
        message: 'Task is toggled',
        taskRef,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  updateTask: async (req, res) => {
    try {
      const taskID = req.params.id;
      const availableTask = await Task.findOne(taskID);
      if (!availableTask) {
        return res.json({ success: false, message: 'Task is not found' });
      }

      await Task.updateOne(taskID).set({ data: req.body.data });

      const updatedTask = await Task.find({ id: req.params.id });

      return res.status(200).send({
        msg: 'Task is Updated',
        updatedTask,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskID = req.params.id;

      const availableTask = await Task.findOne(taskID);
      if (!availableTask) {
        return res.json({ success: false, message: 'Task is not found' });
      }
      const deleteTask = await Task.destroy(taskID).fetch();

      return res.status(200).json({
        message: 'task deleted',
        data: deleteTask,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};
