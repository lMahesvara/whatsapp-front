import { NextResponse } from 'next/server'
import dbConnect from '../dbConnect'
import Message from '@models/Message'
import { NextApiRequest } from 'next'

export async function GET(request: NextApiRequest) {
  const { searchParams } = new URL(request.url as string)
  const chatId = searchParams.get('id')
  if (!chatId) return NextResponse.json({ error: 'Chat not found' })

  try {
    await dbConnect()
    const messages = await Message.find({ chatId: chatId })
    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json({ error: 'Cannot get messages of that chat' })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()

    const { chatId, sender, text, createdAt } = await request.json()
    console.log(chatId, sender, text, createdAt)

    const message = await Message.create({
      chatId,
      sender,
      text,
      createdAt,
    })
    console.log(message)
    return NextResponse.json({ message })
  } catch (error) {
    return NextResponse.json({ error: 'Cannot create message' })
  }
}
