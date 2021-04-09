// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.prototype.$axios =axios // 全局注册，使用方法为：this.$axios
/*引入资源请求插件*/
import VueResource from 'vue-resource'

/*使用VueResource插件*/
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.prototype.getCookie = function(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + '=')
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}
Vue.prototype.setCookie = function(c_name,value,expire){
  var date=new Date()
  date.setSeconds(date.getSeconds()+expire)
  document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
  //console.log(document.cookie)
}
Vue.prototype.delCookie = function(c_name){
  setCookie(c_name, "", -1)
 }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
