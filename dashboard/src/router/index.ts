import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '@/views/SignInView.vue';
import { routeGuard } from '@/assets/javascript/guard';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signIn',
      component: SignInView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == false) {
          next({ name: 'signIn' });
          return false
        } else {
          next();
        }
      },
      component: () => import('../views/HomeView.vue')
    },
  ]
})

export default router
