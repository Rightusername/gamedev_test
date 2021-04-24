import Vue from 'vue';
import App from './App.vue';
import store from 'app/store/index';
import router from './router';
import vuetify from 'app/utils/plugins/vuetify';
import 'app/styles/style.scss';

import VModal from 'vue-js-modal';
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App),
});
