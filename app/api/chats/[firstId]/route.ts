import { NextResponse } from 'next/server'
import Chat from '@models/Chat'
import { NextApiRequest } from 'next'
import User from '@/models/User'
import dbConnect from '../../dbConnect'
import { IChat } from '@/types/Chat'

export async function GET(
  _: NextApiRequest,
  { params }: { params: { firstId: string } }
) {
  const { firstId } = params

  try {
    await dbConnect()
    const firstUser = await User.findById(firstId)
    if (!firstUser) {
      return NextResponse.json({ error: 'User not found' })
    }
    //get all chats where firstId is a member and add an extra field called "lastMessage" with the most recent message

    const chats = (await Chat.find({
      members: { $all: [firstId] },
    })) as IChat[]

    const sortedChats = chats.toSorted((a, b) => {
      if (!a.lastMessage) {
        return -1
      }
      if (!b.lastMessage) {
        return 1
      }
      return (
        b.lastMessage.createdAt.getTime() - a.lastMessage.createdAt.getTime()
      )
    })
    console.log(sortedChats)

    return NextResponse.json({ chats: sortedChats })
  } catch (error) {}
}
