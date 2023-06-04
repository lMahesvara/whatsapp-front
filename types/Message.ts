export interface Message {
  _id?: string
  text: string
  createdAt: Date
  sender?: string
  chatId?: string
}
