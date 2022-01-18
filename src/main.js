import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myHeader from './components/Header.vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'
import {
   applyPolyfills,
   defineCustomElements,
} from '@aws-amplify/ui-components/loader';

Amplify.configure(awsconfig);
 applyPolyfills().then(() => {
   defineCustomElements(window);
});

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex);
Vue.component('my-header',myHeader)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
