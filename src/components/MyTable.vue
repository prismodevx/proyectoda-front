<template>
  <q-table
    :rows="props.data"
    :columns="props.header"
    row-key="id"
    flat
    bordered
    style="border-radius: 6px"
  >
    <template v-slot:body-cell="props">
      <q-td :props="props">
        {{ props.value }}
      </q-td>
      <q-menu touch-position context-menu>
        <q-list dense style="width: 140px">
          <q-item
            v-for="option in contextMenu"
            :key="option.text"
            clickable
            v-close-popup
            @click="emitAction(option.func, props.row)"
          >
            <q-item-section side>
              <q-icon :name="option.icon" color="primary" size="xs" />
            </q-item-section>
            <q-item-section class="text-weight-medium text-grey-8">{{ option.text }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </template>
  </q-table>
</template>

<script setup lang="ts">

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  header: {
    type: Array,
    default: () => []
  },
  contextMenu: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['actionContextMenu']);

const emitAction = (action: string, row: any) => {
  emits('actionContextMenu', { action, row });
};
</script>

<style scoped>
.q-menu {
  z-index: 9999; /* Ensure the menu is on top of other elements */
}
</style>
