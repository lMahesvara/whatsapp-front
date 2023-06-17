import { IMessage } from '@/types/Message'

export const getChat = async (id: string, secId: string) => {
  const res = await fetch(`/api/chats/${id}/${secId}`)
  return await res.json()
}

export const getChats = async (id: string) => {
  const res = await fetch(`/api/chats/${id}`)
  return await res.json()
}

export const getUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`)
  return await res.json()
}

export const getUsers = async () => {
  const res = await fetch(`/api/users`)
  return await res.json()
}

export const postMessage = async (
  message: IMessage
): Promise<IMessage | null> => {
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

export const readMessages = async (chatId: string, userId: string) => {
  try {
    const res = await fetch(`/api/chats/read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, userId }),
    })
    const data = await res.json()
    return data.chat
  } catch (error) {
    console.log(error)
    return null
  }
}
