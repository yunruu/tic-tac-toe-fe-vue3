import { http } from '../utils/request'

export const joinGame = async (pid) => http('post', `/game`, { pid })
