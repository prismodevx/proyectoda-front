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
          @click="onDialogCancel"
        />
      </q-card-section>
      <q-card-section class="q-pt-none" style="display: flex; flex-direction: column; gap: 10px; align-items: center;">
        <q-img :src="props.type === 'success' ? successImage : errorImage" style="width: 120px"/>
        <div class="text-h6 text-weight-bold text-grey-9">{{ props.title }}</div>
        <div class="text-weight-medium text-grey-6">{{ props.message }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none q-my-sm" style="display: flex; flex-direction: column; gap: 10px; align-items: center;">
        <Button
          :label="'Continuar'"
          :color="props.type === 'success' ? 'primary' : 'negative'"
          :text-color="'white'"
          @click="onOKClick"
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
  // ...your custom props
  type: String,
  title: String,
  message: String,
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick () {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
