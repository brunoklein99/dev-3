import { toast } from 'react-toastify'

const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS'
const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR'

export {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
}

class NotificationService {
  notify(notification) {
    if (notification.type === NOTIFICATION_SUCCESS) {
      toast.success(notification.message)
    } else if (notification.type === NOTIFICATION_ERROR) {
      toast.error(notification.message)
    } else {
      throw new Error(`Tipo inválido de notificação: ${notification.type}`)
    }
  }
}

export default new NotificationService()
