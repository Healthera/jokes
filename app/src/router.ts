import Vue from 'vue';
import Router from 'vue-router';
import Jokes from './views/Jokes/Jokes.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'jokes',
      component: Jokes,
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Admin/Admin.vue'),
    },
  ],
});
