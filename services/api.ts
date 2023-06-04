import { Message } from '@/types/Message'

export const getChat = async (id: string, secId: string) => {
  const res = await fetch(`/api/chats/${id}/${secId}`)
  const data = await res.json()
  return data
}

export const getUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`)
  const data = await res.json()

  return data
}

export const postMessage = async (
  message: Message
): Promise<Message | null> => {
  try {
    const res = await fetch(`/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
    const data = await res.json()
    return data.message
  } catch (error) {
    console.log(error)
    return null
  }
}
