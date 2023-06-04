import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import User from '@/models/User'
import dbConnect from '../../dbConnect'

export async function GET(
  _: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!id) {
    return NextResponse.json({ error: 'Id not provided' })
  }

  try {
    await dbConnect()
    console.log(id)

    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ error: 'User not found' })
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Cannot connect to the database' })
  }
}
