import { Board } from "../models/board.model.js";
import { Task } from "../models/task.model.js";

const createTask = async (req, res, next) => {
  try {
    let createdBy = req.user._id

    const board = await  Board.findById(req.params.boardId);

      if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;}
    
    if (board.workspace.toString() !== req.membership.workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }



    

    const task = await Task.create({...req.body, createdBy, board: board._id});
    res.status(201).json(task);



  } catch (error) {
    next(error)
  }
}

const listTasks = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;}
    
    if (board.workspace.toString() !== req.membership.workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }

    const tasks = await Task.find({board: req.params.boardId});
    
    res.status(200).json(tasks);
  } catch (error) {
    next(error)
  }
}

const getTask = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;}
    
    if (board.workspace.toString() !== req.membership.workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }
    

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      const error = new Error("Task not found!");
      error.statuscode = 404;
      throw error;
    }
    
    res.status(200).json(task);



  } catch(error){
    next(error)
  }
}


const updateTask = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;}
    
    if (board.workspace.toString() !== req.membership.workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }
    const findTask  = await Task.findById(req.params.taskId);
    if (!findTask) {
      const error = new Error("Task not found!");
      error.statuscode = 404;
      throw error;
    }

    let {name, description, status, assignee} = req.body
    if (req.membership.role !== "admin" && req.membership.role !== "owner" && assignee) {
      const error = new Error("You need to be an admin or owner to assign a task!");
      error.statuscode = 403;
      throw error;
    }
    const task = await Task.findByIdAndUpdate(req.params.taskId, {name, description, status, assignee}, {returnDocument: 'after'});
    
    res.status(200).json(task);
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;}
    
    if (board.workspace.toString() !== req.membership.workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }
    const findTask  = await Task.findById(req.params.taskId);
    if (!findTask) {
      const error = new Error("Task not found!");
      error.statuscode = 404;
      throw error;
    }

    await findTask.deleteOne();
    res.status(200).json({message: "Task deleted successfully"});
    
  } catch (error) {
    next(error)
  }
}

export {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask
}