import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [500, 'Message cannot be more than 500 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a sender'],
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Message ||
  mongoose.model('Message', MessageSchema)
