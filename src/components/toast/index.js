import Vue from 'vue'
import MToast from './toast.vue'

const Toast = Vue.extend(MToast)
const toastQueen = []

const getInstance = () => {
  if (toastQueen.length > 0) {
    let instance = toastQueen[0]
    toastQueen.splice(0, 1)
    return instance
  }
  return new Toast({
    el: document.createElement('div')
  })
}

const runInstance = instance => {
  if (instance) {
    toastQueen.push(instance)
  }
}

const removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

Toast.prototype.close = function() {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  runInstance(this)
}

const ToastFunc = (options = {}) => {
  let duration = options.duration || 3000
  let instance = getInstance()

  instance.closed = false
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message
  instance.className = options.className || ''
  document.body.appendChild(instance.$el)

  Vue.nextTick(function() {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
    if (duration) {
      instance.timer = setTimeout(function() {
        if (instance.closed) {
          return
        }
        instance.close()
      }, duration)
    }
  })
  return instance
}

export default ToastFunc
