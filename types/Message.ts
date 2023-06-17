export interface IMessage {
  _id?: string
  text: string
  createdAt: Date
  sender?: string
  chatId?: string
}
