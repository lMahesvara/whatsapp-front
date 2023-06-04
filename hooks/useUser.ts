//custom hook useUser
import { getUser } from '@/services/api-chats'
import useSWR from 'swr'

const useUser = (id: string) => {
  const { data, isLoading } = useSWR(`/api/users/${id}`, () => getUser(id))

  return {
    data,
    isLoading,
  }
}

export default useUser
