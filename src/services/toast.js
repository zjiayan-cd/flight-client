import { toast } from 'react-toastify'

export const showSuccess = (message) => {
  toast.success(message, {
    autoClose: 3000,
    position: 'top-center',
    pauseOnHover: true,
    draggable: true
  })
}

export const showError = (message) => {
  toast.error(message, {
    autoClose: false, // 错误不自动关闭
    position: 'top-center',
    pauseOnHover: true,
    draggable: true
  })
}

export const showInfo = (message) => {
  toast.info(message, {
    autoClose: 3000,
    position: 'top-center'
  })
}
