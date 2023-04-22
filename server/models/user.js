import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      // required: true,
      default:
        "https://img.zorores.com/_r/100x100/100/avatar/dragon_ball_chibi/gohan.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async (next) => {
  if (!this.isModified('password')) {
    next();
  }
  const salt= await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password,salt)
});

userSchema.methods.matchPassword=async (enteredPassword)=>{
   return await bcrypt.compare(this.password,enteredPassword);
}
const UserModel = mongoose.model('User',userSchema);
export default UserModel;



