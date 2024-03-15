/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { HTTP_STATUS } = require('../../config/constants');

module.exports = {
  addTask: async (req, res) => {
    try {
      // const userid = req.params.userid;
      const { data, userid } = req.body;
      if (!data || !userid) {
        return res.status(HTTP_STATUS.BAD_REQUEST).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('REQUIRED'),
        });
      }

      const newTask = await Task.create({
        data,
        userid,
      }).fetch();

      return res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SUCCESS_TRUE'),
        message: req.i18n.__('TASK_ADDED'),
        newTask,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  getAllTask: async (req, res) => {
    try {
      const userid = req.params.id;
      const getTask = await Task.find({ userid });
      if (!getTask) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('TASK_NOT_FOUND'),
        });
      }

      return res.status(HTTP_STATUS.SUCCESS).send({
        message: req.i18n.__('TASK_FOUND'),
        getTask,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  toggleTaskDone: async (req, res) => {
    try {
      const taskRef = await Task.findOne({ id: req.params.id });

      await Task.updateOne({ id: req.params.id }).set({ done: !taskRef.done });
      return res.status(HTTP_STATUS.SUCCESS).send({
        message: req.i18n.__('TASK_TOGGLED'),
        taskRef,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  updateTask: async (req, res) => {
    try {
      const taskID = req.params.id;
      const availableTask = await Task.findOne(taskID);
      if (!availableTask) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('TASK_NOT_FOUND'),
        });
      }

      await Task.updateOne(taskID).set({ data: req.body.data });

      const updatedTask = await Task.find({ id: req.params.id });

      return res.status(HTTP_STATUS.SUCCESS).send({
        message: req.i18n.__('TASK_UPDATED'),
        updatedTask,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskID = req.params.id;

      const availableTask = await Task.findOne(taskID);
      if (!availableTask) {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          success: req.i18n.__('SUCCESS_FALSE'),
          message: req.i18n.__('TASK_NOT_FOUND'),
        });
      }
      const deleteTask = await Task.destroy(taskID).fetch();

      return res.status(HTTP_STATUS.SUCCESS).json({
        success: req.i18n.__('SUCCESS_TRUE'),
        message: req.i18n.__('TASK_DELETED'),
        data: deleteTask,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.SERVER_ERROR).send({
        success: req.i18n.__('SUCCESS_FALSE'),
        message: req.i18n.__('SERVER_ERROR_USER'),
        error: error.message,
      });
    }
  },
};
