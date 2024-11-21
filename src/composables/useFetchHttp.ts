import axios from 'axios';
import { ref } from 'vue';

export default function useFetchHttp() {
  const BACKEND_URL = 'http://localhost:8090/api/v1';

  const fetchHttp = async (resource: any) => {
    // const method = resource.method;
    // const data = resource.data;
    // const endpoint = resource.endpoint;

    const { method, data, endpoint } = resource;

    try {
      const apiResource = BACKEND_URL.concat(endpoint);
      switch (method) {
        case 'GET':
          return await axios.get(apiResource, { params: data });
        case 'POST':
          return await axios.post(apiResource, data);
      }
    } catch (e: any) {
      console.log('error: ', e);
    }
  }
  return { fetchHttp };
}
