import { NextResponse } from 'next/server'
import dbConnect from '../dbConnect'
import User from '@models/User'

export async function POST(request: Request) {
  await dbConnect()

  const { name, email, password } = await request.json()

  const user = await User.create({
    name,
    email,
    password,
  })

  //TODO: Redirect to the chats page
  return NextResponse.redirect(`/users/${user._id}`)
}

export async function PUT(request: Request, { params }: any) {
  await dbConnect()

  const { id } = params
  const { name, email, password } = await request.json()

  const user = await User.findByIdAndUpdate(
    id as string,
    { name, email, password },
    { new: true }
  )

  return NextResponse.redirect(`/users/${user._id}`)
}
