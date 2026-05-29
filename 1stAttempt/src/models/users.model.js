import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   // Hash the password before saving (you can use bcrypt or any hashing library)
//   // Example: this.password = hashFunction(this.password);
//   next();
// });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
