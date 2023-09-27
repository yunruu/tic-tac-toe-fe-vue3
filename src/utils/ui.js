import { ElMessage, ElMessageBox } from 'element-plus'

export const openDialog = (msg, title, type = 'warning', showCancelButton = false) => {
  return ElMessageBox.alert(msg, title, {
    confirmButtonText: 'OK',
    type,
    showCancelButton,
  })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

export const openMessage = (msg, type = 'warning') => {
  ElMessage({
    message: msg,
    type,
  })
}
