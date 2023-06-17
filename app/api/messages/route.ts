import { NextResponse } from 'next/server'
import dbConnect from '../dbConnect'
import Message from '@models/Message'
import { NextApiRequest } from 'next'
import Chat from '@/models/Chat'
import { IChat } from '@/types/Chat'
import { IMessage } from '@/types/Message'

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

    const message = (await Message.create({
      chatId,
      sender,
      text,
      createdAt,
    })) as IMessage

    //get chat
    try {
      const chat = (await Chat.findById(chatId)) as IChat
      if (!chat) {
        return NextResponse.json({ error: 'Chat not found' })
      }
      if (!chat.unread || chat.unread.length === 0) {
        console.log('no unread')
        chat.unread = chat.members.map(member =>
          member === sender ? { member, amount: 0 } : { member, amount: 1 }
        )
      } else {
        console.log('unread')
        chat.unread = chat.unread.map(member =>
          member.member === sender
            ? { ...member, amount: 0 }
            : { ...member, amount: member.amount + 1 }
        )
      }

      chat.lastMessage = message
      console.log(chat)

      await Chat.updateOne({ _id: chatId }, chat)
    } catch (error) {}

    //console.log(message)
    return NextResponse.json({ message })
  } catch (error) {
    return NextResponse.json({ error: 'Cannot create message' })
  }
}
