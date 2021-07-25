import Vue from 'vue'
import IndicatorComponent from './main.vue'
const IndicatorConstructor = Vue.extend(IndicatorComponent)

let instance = null

export default {
  open (options = {}) {
    if (!instance) {
      instance = new IndicatorConstructor({
        el: document.createElement('div')
      })
    }
    if (instance.visible) return
    instance.text = typeof options === 'string' ? options : options.text || '加载中...'
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.visible = true
    })
  },

  close () {
    if (instance) {
      instance.visible = false
    }
  }
}
