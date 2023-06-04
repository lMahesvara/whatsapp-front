import dbConnect from '../dbConnect'
import User from '@models/User'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  await dbConnect()

  const user = await User.findOne({
    email,
    password,
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' })
  }
  return NextResponse.json({ id: user._id })
}
