// 让组件基于事件机制来通信
// 事件总线 eventbus
import mitt from 'mitt'//做自定义事件
//实例化
export const toastEvents = mitt();

// 通用的Toast消息展示函数
export function showToast(message, type = 'info') {
    // 任何想要与Toast通信的地方调用
    // emit 发布事件，发布者
    toastEvents.emit('show', { message, type })
}

// 快捷方法
export const toastSuccess = (message) => showToast(message, 'success')
export const toastError = (message) => showToast(message, 'error')
export const toastWarning = (message) => showToast(message, 'warning')
export const toastInfo = (message) => showToast(message, 'info')