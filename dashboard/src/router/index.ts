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
    {
      path: '/account',
      name: 'account',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == false) {
          next({ name: 'signIn' });
          return false
        } else {
          next();
        }
      },
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/updateAccount',
      name: 'updateAccount',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == false) {
          next({ name: 'signIn' });
          return false
        } else {
          next();
        }
      },
      component: () => import('../views/EditAccountView.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUpView.vue')
    }
  ]
})

export default router
