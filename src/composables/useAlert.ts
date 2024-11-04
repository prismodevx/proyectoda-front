import { useQuasar } from 'quasar';
import MyAlert from '../components/MyAlert.vue'; // Adjust the path accordingly

export function useAlert() {
  const $q = useQuasar();

  const alert = (options: { type?: string; title?: string; msg?: string } = {}) => {
    $q.dialog({
      component: MyAlert,
      // Pass props to your dialog component
      componentProps: {
        type: options.type || 'success',
        title: options.title || 'Title',
        message: options.msg || 'Content.',
      },
      persistent: true,
    }).onOk(() => {
      // console.log('Dialog confirmed');
    }).onCancel(() => {
      // console.log('Dialog canceled');
    }).onDismiss(() => {
      // console.log('Dialog dismissed');
    });
  };

  return {
    alert
  };
}
