import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '@/views/SignInView.vue';
import { checkAnswer, checkCourse, checkExercise, checkGame, routeGuard } from '@/assets/javascript/guard';
import AnswerViewVue from '@/views/AnswerView.vue';
import GameDetailViewVue from '@/views/GameDetailView.vue';
import FillCourseViewVue from '@/views/FillCourseView.vue';


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
      path: '/exercises',
      name: 'exercises',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == false) {
          next({ name: 'signIn' });
          return false
        } else {
          next();
        }
      },
      component: () => import('../views/ExerciseView.vue')
    },
    {
      path: '/add-exercises',
      name: 'addExercises',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == false) {
          next({ name: 'signIn' });
          return false
        } else {
          next();
        }
      },
      component: () => import('../views/AddExerciseView.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == false) {
          next({ name: 'signIn' });
          return false
        } else {
          next();
        }
      },
      component: () => import('../views/CoursesView.vue')
    },
    {
      path: '/fill-course/:id',
      name: 'fillCourse',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == true) {
          const reslut = await checkCourse(to.params.id.toString())
          if(reslut){
            next();
          }
          else{
            next({ name: 'home' });
            return false
          }
        } else {
          next({ name: 'signIn' });
          return false
        }
      },
      component: FillCourseViewVue
    },
    {
      path: '/add-course',
      name: 'addCourse',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == false) {
          next({ name: 'signIn' });
          return false
        } else {
          next();
        }
      },
      component: () => import('../views/AddCourseView.vue')
    },
    {
      path: '/course-details/:id',
      name: 'courseDetail',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == true) {
          const reslut = await checkCourse(to.params.id.toString())
          if(reslut){
            next();
          }
          else{
            next({ name: 'home' });
            return false
          }
        } else {
          next({ name: 'signIn' });
          return false
        }
      },
      component: () => import('../views/CourseDetailView.vue')
    },
    {
      path: '/exercise-details/:id',
      name: 'exerciseDetail',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == true) {
          const reslut = await checkExercise(to.params.id.toString())
          if(reslut){
            next();
          }
          else{
            next({ name: 'home' });
            return false
          }
        } else {
          next({ name: 'signIn' });
          return false
        }
      },
      component: () => import('../views/ExerciseDetailView.vue')
    },
    {
      path: '/game/:id',
      name: 'gameDetails',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == true) {
          const reslut = await checkGame(to.params.id.toString())
          if(reslut){
            next();
          }
          else{
            next({ name: 'home' });
            return false
          }
        } else {
          next({ name: 'signIn' });
          return false
        }
      },
      component: GameDetailViewVue
    },
    {
      path: '/answers/:id',
      name: 'answers',
      beforeEnter: async(to, from, next) => {
        if (await routeGuard() == true) {
          const reslut = await checkAnswer(to.params.id.toString())
          if(reslut){
            next();
          }
          else{
            next({ name: 'home' });
            return false
          }
        } else {
          next({ name: 'signIn' });
          return false
        }
      },
      component: AnswerViewVue
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUpView.vue')
    }
  ]
})

export default router
