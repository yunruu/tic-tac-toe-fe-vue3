import axios from 'axios'
import { openDialog } from './ui'

let service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
})

init()
function init() {
  // Response interceptors
  service.interceptors.response.use(
    async (response) => {
      const res = response
      if (res.status !== 200 && res.status !== 201) {
        await catchError(response)
        return Promise.reject(response)
      } else {
        return res
      }
    },
    async (error) => {
      await catchError(error)
      return Promise.reject(error)
    },
  )
}

async function catchError(error) {
  let message = error.response?.data?.message || error.response?.statusText || error.message
  openDialog(message, 'Warning', false)
}

export default service

export function http(method, url, data = {}, isBlob = false) {
  return service({
    url: url,
    method,
    responseType: isBlob ? 'blob' : 'json',
    data,
  })
    .then((response) => {
      let r = response
      if (!isBlob) {
        r = response.data
      }
      return r
    })
    .catch(() => {
      return false
    })
}
