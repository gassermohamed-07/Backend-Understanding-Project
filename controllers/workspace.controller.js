import { Workspace } from "../models/workspace.model.js";
import { User } from "../models/user.model.js";
import { Board } from "../models/board.model.js";
import mongoose from "mongoose";







const createWorkspace = async (req, res, next) => {
  try {
    let createdBy = req.user._id
    const workspace = await Workspace.create({...req.body, createdBy, members: [{member: createdBy, role: "owner"}]} );
    await User.findByIdAndUpdate(createdBy, {$push: {workspaces: {workspace :workspace._id, role: "owner"}}});
    res.status(201).json(workspace);
    
  } catch (error) {
    next(error);
  }
}

const listWorkspaces = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("workspaces.workspace");
    res.status(200).json(user.workspaces);

  } catch (error) {
    next(error);
  }
}

const getWorkspace = async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId);

    if (!workspace) {
      const error = new Error("Workspace not found!");
      error.statuscode = 404;
      throw error;
    }
    res.status(200).json(workspace);



  } catch (error) {
    next(error);
  }
}

const updateWorkspace = async (req, res, next) => {
  try {
    const {name, description} = req.body;
    const workspace = await Workspace.findByIdAndUpdate(req.params.workspaceId, {name, description}, {returnDocument: 'after'});
    if (!workspace) {
      const error = new Error("Workspace not found!");
      error.statuscode = 404;
      throw error;
    }
    res.status(200).json(workspace);

  } catch (error) {
    next(error);
  }
}

const deleteWokspace = async (req, res, next) =>{
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const workspaceId = req.params.workspaceId;
    await Board.deleteMany({workspace: workspaceId}, {session});
    await User.updateMany({"workspaces.workspace": workspaceId}, {$pull: {workspaces: {workspace: workspaceId}}}, {session});
    await Workspace.findByIdAndDelete(workspaceId, {session});
    session.commitTransaction();
    res.status(204).json({message: "Workspace deleted successfully"})
  } catch (error) {
    session.abortTransaction();
    next(error);
  } finally{
    session.endSession();
   ;
  }
}




export {
  createWorkspace,
  listWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWokspace
}