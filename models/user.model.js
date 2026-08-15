import mongoose, { Schema } from "mongoose";
import bcrypt, { compare } from "bcryptjs";
const userSchema = new mongoose.Schema({
  name:{type : String, required : [true, "User Name is required"], trim: true,
    minLength : 2, maxLength : 20, 
   },
   email:{
    type : String, required : [true, "User Email is required"], trim: true,
    unique: true, lowercase : true,
    minLength : 5, maxLength : 255,
    match: [/\S+@\S+\.\S+/, "PLease fill in a valid email."]
   },
   password:{
    type : String, required : [true, "User Password is required"], minLength:6,
   }, workspaces:[{
    workspace: {type: Schema.Types.ObjectId, ref: 'Workspace', required: true},
    role: {type: String, enum: ["owner", "admin", "member"], required: true},
   }]
    
   }, {timestamps: true}
 )

 userSchema.pre("save",  async function(){
if (!this.isModified("password")) return;
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt)

});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};


export const User = mongoose.model("User", userSchema);
