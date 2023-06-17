import { IMessage } from './Message'

type Unread = {
  member: string
  amount: number
}

export interface IChat {
  _id: string
  members: string[]
  lastMessage: IMessage
  unread: Unread[]
}
