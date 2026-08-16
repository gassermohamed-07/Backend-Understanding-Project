import { Task } from "../models/task.model.js";
import { Board } from "../models/board.model.js";
import { Workspace } from "../models/workspace.model.js";
import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";

const createComment = async (req, res, next) => {
  try {
    const findTask = await Task.findById(req.params.taskId);
    if (!findTask) {
      const error = new Error("Task not found!");
      error.statuscode = 404;
      throw error;
    }
    if (findTask.board.toString() !== req.params.boardId) {
      const error = new Error("Task not part of board!");
      error.statuscode = 403;
      throw error;
    }
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;
    }

    if (board.workspace.toString() !== req.membership.workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }
    const {text} = req.body
    const comment = await Comment.create({text, task: req.params.taskId, createdBy: req.user._id})
    res.status(200).json(comment);

  } catch (error) {
    next(error)
  }
}


const deleteComment = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      const error = new Error("Task not found!");
      error.statuscode = 404;
      throw error;
    }
    if (task.board.toString() !== req.params.boardId) {
      const error = new Error("Task not part of board!");
      error.statuscode = 403;
      throw error;
    }
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;
    }
    if (board.workspace.toString() !== req.membership.workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      const error = new Error("Comment not found!");
      error.statuscode = 404;
      throw error;
    }
    if (comment.createdBy.toString() !== req.user._id.toString() && req.membership.role !== "admin" && req.membership.role !== "owner") {
      const error = new Error("You are not the creator of this comment!");
      error.statuscode = 403;
      throw error;
    }
    await comment.deleteOne();
    res.status(200).json({message: "Comment deleted successfully"});
  } catch (error) {
    next(error)
  }
}

const listComments = async (req, res, next) =>{
  try {
    const task  = await Task.findById(req.params.taskId);
    if (!task) {
      const error = new Error("Task not found!");
      error.statuscode = 404;
      throw error;
    }
    if (task.board.toString() !== req.params.boardId) {
      const error = new Error("Task not part of board!");
      error.statuscode = 403;
      throw error;
    }
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;
    }
    if (board.workspace.toString() !== req.membership.workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }

    const comments = await Comment.find({task: req.params.taskId});
    res.status(200).json(comments);
  } catch (error) {
    next(error)
  }
}
export {
  createComment,
  deleteComment,
  listComments
}