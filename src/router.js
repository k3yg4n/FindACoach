import { createRouter, createWebHistory } from 'vue-router';

// Import pages
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }], // /coaches/:id/contact
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

// Global navigation guard (register, request, and auth routes)
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth'); // Redirect to /auth
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches'); // Redirect to /coaches
  } else {
    next(); // Otherwise continue as planned
  }
});

export default router;
