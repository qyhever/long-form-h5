import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 提示 您之前已经回答了部分题目，是否继续上次回答？

// import VConsole from 'vconsole'

import './assets/icons'
import './plugins'
import './assets/styles/index.less'

if (process.env.NODE_ENV === 'development') {
  // new VConsole()
}
if (process.env.NODE_ENV !== 'development') {
  console.log(navigator.userAgent)
  console.log(`last delopy: %c${process.env.NOW}`, 'color: #67C23A')
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
