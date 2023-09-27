import { ElMessage, ElMessageBox } from 'element-plus'

export const openDialog = (msg, title, showCancelButton = false) => {
  return ElMessageBox.alert(msg, title, {
    confirmButtonText: 'OK',
    showCancelButton,
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

export const openMessage = (msg) => {
  ElMessage({
    message: msg,
  })
}
