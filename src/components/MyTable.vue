<template>
  <q-table
    :rows="data"
    :columns="header"
    row-key="id"
    flat
  >

  </q-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  header: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>

</style>
