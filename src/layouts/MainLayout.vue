<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Todonary - App
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Modulos
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page style="padding: 48px;">
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
