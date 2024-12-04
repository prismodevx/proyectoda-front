import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/dashboard/',
        component: () => import('pages/dashboard/views/List.vue'),
      },
      {
        path: '/tareas/',
        component: () => import('pages/tareas/views/List.vue')
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: () => import('pages/login/views/Form.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
