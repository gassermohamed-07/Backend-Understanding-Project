import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Workspace } from "../models/workspace.model.js";


const sendInvite = async (req, res, next) => {
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    const email = req.body.email

    const user = await User.findOne({email})
    if (!user) {
      const error = new Error("User not found!")
      error.statuscode = 404
      throw error
    }

    const workspace = await Workspace.findById(req.params.workspaceId)
    if (!workspace) {
      const error = new Error("Workspace not found!")
      error.statuscode = 404
      throw error
    }
    if (user.workspaces.find(w => w.workspace.toString() === workspace._id.toString())) {
      const error = new Error("User is already a member of this workspace!")
      error.statuscode = 400
      throw error
    }
    await User.findByIdAndUpdate(user._id, {$push: {workspaces: {workspace: workspace._id, role: "member"}}}, {session})
    await Workspace.findByIdAndUpdate(workspace._id, {$push: {members:{ member: user._id, role: "member"}}}, {session})

    
    await session.commitTransaction()
    res.status(200).json({message: "Member added successfully."})
  } catch (error) {
    await session.abortTransaction()
    next(error);
  } finally{
    await session.endSession();
  }

}

export {
  sendInvite,
  
}