import Vue from 'vue';
import Router from 'vue-router';

import Main from './views/Main.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '**',
      redirect: '/',
    },
  ],
});
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title ? to.meta.title : 'Gamedev test';
  });
});

export default router;
