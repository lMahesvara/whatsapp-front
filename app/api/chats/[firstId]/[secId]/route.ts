import { NextResponse } from 'next/server'
import dbConnect from '../../../dbConnect'
import Chat from '@models/Chat'
import { NextApiRequest } from 'next'
import User from '@/models/User'
import Message from '@/models/Message'

export async function GET(
  _: NextApiRequest,
  { params }: { params: { firstId: string; secId: string } }
) {
  await dbConnect()
  const { firstId, secId } = params

  const firstUser = await User.findById(firstId)
  const secUser = await User.findById(secId)
  if (!firstUser || !secUser) {
    return NextResponse.json({ error: 'User not found' })
  }
  const chat = await Chat.findOne({
    members: { $all: [firstId, secId] },
  })
  if (!chat) {
    const newChat = await Chat.create({
      members: [firstId, secId],
    })
    return NextResponse.json({ chat: newChat })
  }

  const messages = await Message.find({ chatId: chat._id })
  //console.log(messages)

  return NextResponse.json({ chat, messages })
}
