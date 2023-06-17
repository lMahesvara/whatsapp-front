import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      required: [true, 'Please provide members'],
    },
    unread: {
      type: Array,
      default: [],
    },
    lastMessage: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema)
