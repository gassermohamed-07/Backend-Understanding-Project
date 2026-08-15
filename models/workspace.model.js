import mongoose, { Schema } from "mongoose";

const workspaceSchema = new mongoose.Schema({
  name: {type : String, required : [true, "Workspace Name is required"], trim: true},
    description: {type : String, trim: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    members: [{member:{type: Schema.Types.ObjectId, ref: 'User', required: true}, role: {type: String, enum: ["owner", "admin", "member"], required: true}}],
}, {timestamps: true}
)

export const Workspace = mongoose.model("Workspace", workspaceSchema);
