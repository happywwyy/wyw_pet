import { Toast as VantToast } from 'react-vant'
import { useEffect } from 'react'
import { toastEvents } from './ToastController'

const Toast = () => {
  useEffect(() => {
    const handleToast = ({ message, type }) => {
      switch (type) {
        case 'success':
          VantToast.success(message)
          break
        case 'error':
          VantToast.fail(message)
          break
        case 'warning':
          VantToast.info(message)
          break
        default:
          VantToast.info(message)
      }
    }

    toastEvents.on('show', handleToast)
    
    return () => {
      toastEvents.off('show', handleToast)
    }
  }, [])
  
  return null
}

export default Toast