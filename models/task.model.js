import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
  name: {type : String, required : [true, "Task Name is required"], trim: true},
  description: {type : String, trim: true},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  status: {type: String, enum: ["To do", "In Progress", "Done", "Cancelled", "Overdue"], required: true, default: "To do"},
  board: {type: Schema.Types.ObjectId, ref: 'Board', required: true},
  assignee: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true}
)

export const Task = mongoose.model("Task", taskSchema);


