
import {Board} from "../models/board.model.js";
;

const createBoard = async (req, res, next) =>{
  try {
    let createdBy = req.user._id;
    
    let workspace = req.membership.workspace

    const board = await Board.create({...req.body, createdBy, workspace});

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
}

const listBoards = async (req, res, next) => {
  try {
    const workspace = req.params.workspaceId

    const boards = await Board.find({workspace});

    res.status(200).json(boards);
  } catch (error) {
    next(error)
  }
}

const getBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;
    }

    const workspace = req.membership.workspace

    if (board.workspace.toString() !== workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }
    
    res.status(200).json(board);
  } catch (error) {
    next(error)
  }
}

const updateBoard = async (req, res, next) => {
  try {
    const findBoard = await Board.findById(req.params.boardId);
    if (!findBoard) {
      const error = new Error("Board not found!");
      error.statuscode = 404;
      throw error;
    }

    const workspace = req.membership.workspace

    if (findBoard.workspace.toString() !== workspace.toString()) {
      const error = new Error("You are not a member of this workspace!");
      error.statuscode = 403;
      throw error;
    }

    const {name, description} = req.body
    const board = await Board.findByIdAndUpdate(req.params.boardId, {name, description}, {returnDocument: 'after'});
    res.status(200).json(board);

  } catch (error) {
    next(error)
  }
}

export {

  createBoard,
  listBoards,
  getBoard,
  updateBoard
}