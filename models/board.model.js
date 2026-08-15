import mongoose, { Schema } from "mongoose";

const boardSchema = new mongoose.Schema({
  name: {type : String, required : [true, "Board Name is required"], trim: true},
  description: {type : String, trim: true},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  workspace: {type: Schema.Types.ObjectId, ref: 'Workspace', required: true}
}, {timestamps: true}
)

export const Board = mongoose.model("Board", boardSchema);