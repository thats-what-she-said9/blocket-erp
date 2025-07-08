import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'manager', 'viewer'], // Removed 'operator'
      default: 'manager', // Now defaults to 'manager'
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// Remove passwordHash from API responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export default mongoose.model('User', userSchema);
