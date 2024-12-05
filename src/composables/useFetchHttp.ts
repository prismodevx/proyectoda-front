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
    const { method, data, endpoint, pathVariable, responseType, accept } = resource;

    try {
      let apiResource = BACKEND_URL.concat(endpoint);

      const token = localStorage.getItem('token');

      const decoded: any = jwtDecode(token ?? '');
      const usuario = decoded.sub;
      const usuarioId = decoded.id;

      switch (method) {
        case 'GET':
          // Asegúrate de manejar el responseType correctamente para la descarga de archivo
          const response = await axios.get(apiResource, {
            params: { ...data, usuario: usuario, usuarioId: usuarioId },
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: accept,
            },
            responseType: responseType // Asegúrate de que 'responseType' sea 'blob' cuando sea un archivo
          });
          return response;

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
          });
        case 'DELETE':
          return await axios.delete(apiResource, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

        default:
          throw new Error(`Método HTTP ${method} no soportado`);
      }
    } catch (e: any) {
      console.log('error: ', e);
      if (e.response && e.response.status === 401) {
        localStorage.removeItem('token');
        dialogConfirm({
          type: 'error',
          title: 'El token ha expirado',
          msg: 'Vuelve a iniciar sesión',
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
