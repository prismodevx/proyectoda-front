import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { useDialogConfirm } from 'src/composables/useDialogConfirm';

export default function useFetchHttp() {
  const BACKEND_URL = 'http://localhost:8090/api/v1';
  const router = useRouter();
  const { dialogConfirm } = useDialogConfirm();

  const fetchHttp = async (resource: any) => {
    // const method = resource.method;
    // const data = resource.data;
    // const endpoint = resource.endpoint;

    const { method, data, endpoint, pathVariable, responseType } = resource;

    try {
      let apiResource = BACKEND_URL.concat(endpoint);

      const token = localStorage.getItem('token');

      const decoded: any = jwtDecode(token ?? '');
      const usuario = decoded.sub;
      const usuarioId = decoded.id;

      console.log(usuarioId);

      switch (method) {
        case 'GET':
          return await axios.get(apiResource, {
            params: { ...data, usuario: usuario, usuarioId: usuarioId },
            headers: {
              Authorization: `Bearer ${token}`
            },
            responseType: responseType
          });
        case 'POST':
          return await axios.post(apiResource, { ...data, usuario: usuario, usuarioId: usuarioId }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        case 'PUT':
          apiResource = pathVariable ? apiResource + '/' + usuarioId : apiResource;
          return await axios.put(apiResource, { ...data, usuario: usuario, usuarioId: usuarioId }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        default:
          throw new Error(`Método HTTP ${method} no soportado`);
      }
    } catch (e: any) {
      console.log('error: ', e);

      if (e.response && e.response.status === 401) {
        // Si el código de estado es 401, redirige al login
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        dialogConfirm({
          type: 'error',
          title: 'El token ha expirado',
          msg: 'Vuelve a iniciar sesion',
          onOk: () => {
            router.push('/login');
          },
          onCancel: () => {
            router.push('/login');
          },
        });

      }

      throw e;
    }
  }
  return { fetchHttp };
}
