import { NextResponse } from 'next/server'
import dbConnect from '../../dbConnect'
import Chat from '@/models/Chat'
import { IChat } from '@/types/Chat'

export async function PUT(request: Request) {
  const { chatId, userId } = await request.json()
  if (!chatId || !userId) {
    return NextResponse.json({ error: 'Chat not found' })
  }
  try {
    await dbConnect()

    const chat = (await Chat.findById(chatId)) as IChat
    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' })
    }
    chat.unread = chat.unread.map(member =>
      member.member === userId ? { ...member, amount: 0 } : member
    )

    await Chat.updateOne({ _id: chatId }, chat)
    console.log(chat)

    return NextResponse.json({ chat })
  } catch (error) {
    return NextResponse.json({ error: 'Cannot get messages of that chat' })
  }
}
