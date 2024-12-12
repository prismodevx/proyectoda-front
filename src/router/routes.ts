import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/views/List.vue'),
      },
      {
        path: '/dashboard/',
        component: () => import('pages/dashboard/views/List.vue'),
      },
      {
        path: '/tareas/',
        component: () => import('pages/tareas/views/List.vue')
      },
      {
        path: '/categorias/',
        component: () => import('pages/categorias/views/List.vue')
      },
      {
        path: '/pomodoro/',
        component: () => import('pages/pomodoro/views/Pomodoro.vue')
      },
      {
        path: '/acerca-de/',
        component: () => import('pages/acerca-de/views/AcercaDe.vue')
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
