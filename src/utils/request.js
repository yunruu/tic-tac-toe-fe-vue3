import axios from 'axios'

let service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
})

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
