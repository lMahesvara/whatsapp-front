import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      maxlength: [30, 'Email cannot be more than 30 characters'],
    },
    password: {
      type: String,
      required: false,
    },
    token: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
