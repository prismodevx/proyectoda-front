import { useQuasar } from 'quasar';
import DialogConfirm from '../components/DialogConfirm.vue'; // Adjust the path accordingly

export function useDialogConfirm() {
  const $q = useQuasar();

  const dialogConfirm = (options: any = {}) => {
    const { type = 'success', title = 'Title', msg = 'Message', onOk, onCancel } = options;

    $q.dialog({
      component: DialogConfirm,
      // Pass props to your dialog component
      componentProps: {
        type,
        title,
        message: msg,
        onOk,
        onCancel,
      },
      persistent: true,
    }).onOk(() => {
      if (onOk) onOk();
    }).onCancel(() => {
      if (onCancel) onCancel();
    }).onDismiss(() => {
      // console.log('Dialog dismissed');
    });
  };

  return {
    dialogConfirm
  };
}
