import { http } from '../utils/request'

export const joinGame = async (pid) => http('post', `/game`, { pid })

export const boardInfo = async (id) => http('get', `/game/${id}`)

export const makeMove = async (id, pid, boardIdx, moveValue) =>
  http('patch', `/game/board/${id}/${pid}`, { move: { idx: boardIdx, value: moveValue } })

export const leaveGame = async (id, pid) => http('patch', `/game/${id}/${pid}`)
