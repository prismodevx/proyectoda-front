<template>
  <q-btn
    :label="props.label"
    no-caps
    unelevated
    :class="{ 'with-label': props.label }"
    style="border-radius: 6px"
  >

  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  }
});
</script>

<style scoped>
.with-label >>> .q-icon {
  font-size: 20px;
  padding: 0;
  margin: 0 8px 0 0;
}
</style>
