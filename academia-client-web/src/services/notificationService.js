import { toast } from 'react-toastify'

const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS'
const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR'

export {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
}

class NotificationService {
  notifyError(message) {
    return toast.error(message)
  }

  notifySuccess(message) {
    return toast.success(message)
  }

  dismissAll() {
    toast.dismiss()
  }
}

export default new NotificationService()
