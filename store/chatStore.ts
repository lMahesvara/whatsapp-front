import { create } from 'zustand'

type Store = {
  friendId: string
  chatId: string
}

type Actions = {
  setFriendId: (friendId: string) => void
  setChatId: (chatId: string) => void
}

export const useChatStore = create<Store & Actions>(set => ({
  friendId: '',
  chatId: '',
  setFriendId: (friendId: string) => set({ friendId }),
  setChatId: (chatId: string) => set({ chatId }),
}))
