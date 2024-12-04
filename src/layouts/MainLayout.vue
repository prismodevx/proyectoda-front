<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="flex justify-end bg-white q-px-none" style="border-bottom: 1px solid #dfdfdf">
<!--        <q-btn-->
<!--          flat-->
<!--          dense-->
<!--          round-->
<!--          icon="menu"-->
<!--          aria-label="Menu"-->
<!--          @click="toggleLeftDrawer"-->
<!--        />-->

<!--        <q-toolbar-title>-->
<!--          Todonary - App-->
<!--        </q-toolbar-title>-->
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="grey" text-color="white" icon="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold" style="font-size: 18px; color: #1D1D1D">Alexis</q-item-label>
            <q-item-label caption>alexis@gmail.com</q-item-label>
          </q-item-section>
          <q-item-section style="margin: 0; padding: 0"  class="q-pa-none" avatar>
            <q-avatar style="margin: 0; padding: 0" size="xl" class="q-pa-none" text-color="black" icon="arrow_drop_down" />
          </q-item-section>
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Having fun</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Crazy for transitions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Cerrar sesion</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="height: 100vh; display: flex; flex-direction: column;"
    >
      <q-item class="q-py-md">
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" icon="edit" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold" style="font-size: 18px; color: #1D1D1D">Notionary</q-item-label>
          <q-item-label caption>Mejora tu productividad...</q-item-label>
        </q-item-section>
      </q-item>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <q-list class="q-px-md q-mt-lg">
          <div>Menu</div>
          <q-item class="q-pa-none" style="border-radius: 6px" clickable v-ripple :to="'/dashboard'">
            <q-item-section avatar>
              <q-avatar  text-color="grey" icon="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757">Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pa-none" style="border-radius: 6px" clickable v-ripple :to="'/tareas'">
            <q-item-section avatar>
              <q-avatar  text-color="grey" icon="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757">Tareas</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pa-none" style="border-radius: 6px" clickable v-ripple :to="'/categorias'">
            <q-item-section avatar>
              <q-avatar  text-color="grey" icon="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757">Categorias</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="q-px-md q-mt-lg">
          <div>Centro de ayuda</div>
          <q-item class="q-pa-none" style="border-radius: 6px" clickable v-ripple :to="'/dashboard'">
            <q-item-section avatar>
              <q-avatar  text-color="grey" icon="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757">Configuracion</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pa-none" style="border-radius: 6px" clickable v-ripple :to="'/tareas'">
            <q-item-section avatar>
              <q-avatar  text-color="grey" icon="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757">Ayuda</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pa-none" style="border-radius: 6px" clickable v-ripple :to="'/categorias'">
            <q-item-section avatar>
              <q-avatar  text-color="grey" icon="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757">Acerca de</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container style="background-color: #f4f4f6">
      <q-page class="q-px-lg q-py-lg">
        <router-view style="margin: 0;"/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

// const links = [
//   {
//     url: '/',
//     name: 'Dashboard',
//     icon: 'dashboard'
//   },
//   {
//     url: '/empleados',
//     name: 'Empleados',
//     icon: 'groups'
//   },
//   {
//     url: '/areas',
//     name: 'Areas',
//     icon: 'layers'
//   },
//   {
//     url: '/cargos',
//     name: 'Cargos',
//     icon: 'work'
//   }
// ];

const essentialLinks = [
  {
    title: 'Dashboard',
    caption: '',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: 'Tareas',
    caption: 'Lista, registra o actualiza',
    icon: 'book',
    link: '/tareas'
  },
  {
    title: 'Categorias',
    caption: 'Para categorizar las tareas',
    icon: 'tag',
    link: '/categorias'
  },
  // {
  //   title: 'Discord Chat Channel',
  //   caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev'
  // },
  // {
  //   title: 'Forum',
  //   caption: 'forum.quasar.dev',
  //   icon: 'record_voice_over',
  //   link: 'https://forum.quasar.dev'
  // },
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev'
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev'
  // }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
