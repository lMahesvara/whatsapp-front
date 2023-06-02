export interface Message {
  id?: string
  text: string
  createdAt: Date
  sender?: string
  conversationId?: string
}
