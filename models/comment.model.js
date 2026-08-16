import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {type : String, required : [true, "Comment text is required"], trim: true},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  task: {type: Schema.Types.ObjectId, ref: 'Task', required: true},
}, {timestamps: true}
)

export const Comment = mongoose.model("Comment", commentSchema);
