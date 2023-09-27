import { http } from '../utils/request'

export const createPlayer = async (username) => {
  username = username !== '' ? username : 'Anonymous'
  return http('post', '/player', { username })
}
