import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false
import VueCompositionApi from '@vue/composition-api'
import modalManager from './plugins/modalManage'
import modalList from './modal'
Vue.use(Antd);

// 应用
Vue.use(modalManager, {
  modals: modalList
})
Vue.use(VueCompositionApi)
new Vue({
  render: h => h(App),
}).$mount('#app')
