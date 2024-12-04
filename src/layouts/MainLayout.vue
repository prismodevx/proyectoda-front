<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar
        class="flex justify-end bg-white q-px-none"
        style="border-bottom: 1px solid #dfdfdf"
      >
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
            <q-item-label
              class="text-weight-bold"
              style="font-size: 18px; color: #1d1d1d"
              >Alexis</q-item-label
            >
            <q-item-label caption>alexis@gmail.com</q-item-label>
          </q-item-section>
          <q-item-section
            style="margin: 0; padding: 0"
            class="q-pa-none"
            avatar
          >
            <q-avatar
              style="margin: 0; padding: 0"
              size="xl"
              class="q-pa-none"
              text-color="black"
              icon="arrow_drop_down"
            />
          </q-item-section>
          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Having fun</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Crazy for transitions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="logout">
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
      style="height: 100vh; display: flex; flex-direction: column"
    >
      <q-item class="q-py-md">
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" icon="edit" />
        </q-item-section>
        <q-item-section>
          <q-item-label
            class="text-weight-bold"
            style="font-size: 18px; color: #1d1d1d"
            >Notionary</q-item-label
          >
          <q-item-label caption>Mejora tu productividad...</q-item-label>
        </q-item-section>
      </q-item>

      <div
        style="
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <q-list class="q-px-md q-mt-lg">
          <div class="q-mb-sm">Menu</div>
          <q-item
            class="q-pa-none"
            style="border-radius: 6px"
            clickable
            v-ripple
            :to="'/dashboard'"
          >
            <q-item-section avatar>
              <q-avatar text-color="grey" icon="apps" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757"
                >Dashboard</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item
            class="q-pa-none"
            style="border-radius: 6px"
            clickable
            v-ripple
            :to="'/tareas'"
          >
            <q-item-section avatar>
              <q-avatar text-color="grey" icon="check_box" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757"
                >Tareas</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item
            class="q-pa-none"
            style="border-radius: 6px"
            clickable
            v-ripple
            :to="'/categorias'"
          >
            <q-item-section avatar>
              <q-avatar text-color="grey" icon="bookmark" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757"
                >Categorias</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="q-px-md q-mt-lg">
          <div class="q-mb-sm">Centro de ayuda</div>
          <q-item
            class="q-pa-none"
            style="border-radius: 6px"
            clickable
            v-ripple
            :to="'/dashboard'"
          >
            <q-item-section avatar>
              <q-avatar text-color="grey" icon="settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757"
                >Configuracion</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item
            class="q-pa-none"
            style="border-radius: 6px"
            clickable
            v-ripple
            :to="'/tareas'"
          >
            <q-item-section avatar>
              <q-avatar text-color="grey" icon="help" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757"
                >Ayuda</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item
            class="q-pa-none"
            style="border-radius: 6px"
            clickable
            v-ripple
            :to="'/categorias'"
          >
            <q-item-section avatar>
              <q-avatar text-color="grey" icon="info" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium" style="color: #575757"
                >Acerca de</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container style="background-color: #f4f4f6">
      <q-page class="q-px-lg q-py-lg">
        <router-view style="margin: 0" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDialogConfirm } from 'src/composables/useDialogConfirm';
import { useRouter } from 'vue-router';

const { dialogConfirm } = useDialogConfirm();
const router = useRouter();

const leftDrawerOpen = ref(false);

const logout = async () => {
  try {
    dialogConfirm({
      type: 'success',
      title: 'Deseas salir del sistema?',
      msg: 'Puedes volver a iniciar cuando desees',
      onOk: () => {
        router.push('/login');
      },
      onCancel: () => {
        console.log('Cancelado: Acción detenida.');
      },
    });
  } catch (e) {
    console.log(e);
  }
};
</script>
