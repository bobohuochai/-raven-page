import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import element from 'element-ui'
import avPage from 'alpha-vpage'
import App from './App.vue'

Vue.use(element)
Vue.use(avPage)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
