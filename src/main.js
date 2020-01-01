import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  observer: true
});

new Vue({
  el: '#app',
  render: h => h(App)
})
