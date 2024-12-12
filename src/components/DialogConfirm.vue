<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 400px; border-radius: 6px">
      <q-card-section class="q-pa-none flex justify-end q-ma-sm">
        <Button
          :icon="'close'"
          :color="'white'"
          :text-color="'black'"
          round
          size="md"
          @click="handleCancelClick"
        />
      </q-card-section>
      <q-card-section class="q-pt-none" style="display: flex; flex-direction: column; gap: 10px; align-items: center;">
        <q-img :src="props.type === 'success' ? successImage : errorImage" style="width: 120px"/>
        <div class="text-h6 text-weight-bold text-grey-9">{{ title }}</div>
        <div class="text-weight-medium text-grey-6">{{ message }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-my-sm" style="display: flex; flex-direction: row; gap: 30px; align-items: center; justify-content: center">
        <Button
          :label="'Cancelar'"
          :color="'white'"
          :text-color="'negative'"
          @click="handleCancelClick"
          style="border: 2px solid red; width: 100px"
        />
        <Button
          :label="'Si'"
          :color="type === 'success' ? 'primary' : 'negative'"
          :text-color="'white'"
          @click="handleOkClick"
          style="width: 100px"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import Button from '../components/MyButton.vue'

import successImage from '@/assets/sucess.svg';
import errorImage from '@/assets/fail.svg';

const props = defineProps({
  type: String,
  title: String,
  message: String,
  onOk: Function,
  onCancel: Function,
});

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function handleOkClick() {
  if (props.onOk) props.onOk();
  onDialogCancel();
}

function handleCancelClick() {
  if (props.onCancel) props.onCancel();
  onDialogCancel();
}
</script>
