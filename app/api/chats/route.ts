import { NextResponse } from 'next/server'
import dbConnect from '../dbConnect'
import Chat from '@models/Chat'
import { NextApiRequest } from 'next'
import Message from '@/models/Message'

//get chat of a user and get chat of two users
export async function GET(request: NextApiRequest) {
  const { searchParams } = new URL(request.url as string)
  const userId = searchParams.get('id')
  if (!userId) return NextResponse.json({ error: 'User not found' })

  try {
    await dbConnect()
    const chats = await Chat.find({
      members: { $in: [userId] },
    })
    return NextResponse.json({ chats })
  } catch (error) {
    return NextResponse.json({ error: 'Cannot get chats of that user' })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()

    const { members } = await request.json()

    const chat = await Chat.create({
      members,
    })
    return NextResponse.json({ chat })
  } catch (error) {
    return NextResponse.json({ error: 'Cannot create chat' })
  }
}

export async function DELETE(request: NextApiRequest) {
  const { searchParams } = new URL(request.url as string)
  const chatId = searchParams.get('id')
  if (!chatId) return NextResponse.json({ error: 'Chat not found' })

  try {
    await dbConnect()
    const chat = await Chat.findByIdAndDelete(chatId)
    //delete all messages of that chat
    const messages = await Message.deleteMany({ chatId: chatId })
  } catch (error) {
    return NextResponse.json({ error: 'Chat not found' })
  }

  return NextResponse.json({ ok: true })
}
