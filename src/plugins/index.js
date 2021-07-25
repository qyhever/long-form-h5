// import Vue from 'vue'
// import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'

// Vue.use(VueLazyload, {
//   loading: require('@/assets/images/loading2.gif')
// })

import './vant'
import './constant'
import './method'
import './component'

//  hack the active pseudo-classes failure caused by -webkit-overflow-scrolling touch
FastClick.attach(document.body)
