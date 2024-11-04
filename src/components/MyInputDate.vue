<template>
  <q-input
    outlined
    dense
    v-model="model"
    reactive-rules
    mask="##/##/####"
    hide-bottom-space
    @click="showPopup = true"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer" @click.stop="showPopup = true">
        <q-popup-proxy
          v-model="showPopup"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            lang="es"
            v-model="model"
            mask="DD/MM/YYYY"
            minimal
            bordered
            flat
            @update:model-value="closePopup"
          >

          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
/****************************************************************************/
/*                             PROPS                                        */
/****************************************************************************/
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

/****************************************************************************/
/*                             EMITS                                        */
/****************************************************************************/
const emit = defineEmits(['update:modelValue']);

/****************************************************************************/
/*                              DATA                                        */
/****************************************************************************/
const model = ref(props.modelValue);
const showPopup = ref(false);

/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const closePopup = (newVal: string) => {
  model.value = newVal;
  showPopup.value = false;
};
/****************************************************************************/
/*                              WATCH                                       */
/****************************************************************************/
watch(() => props.modelValue, (newVal) => {
  model.value = newVal;
});

watch(model, (newVal) => {
  emit('update:modelValue', newVal);
})
</script>

<style scoped>

</style>
