<template >
  <div class="row flex flex-center" style="height: 100vh">
    <q-card style="">
      <q-card-section>
        <div class="text-h6">
          Login
        </div>
        <q-form>
          <div class="col-12">
            <q-input
              label="email"
              type="email"
              v-model="email"
            >

            </q-input>
          </div>
          <div class="col-12">
            <q-input
              label="password"
              type="password"
              v-model="password"
            >
            </q-input>
          </div>
          <div class="col-12">
            <q-btn
              label="Iniciar Sesion"
              @click="login"
            >

            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, Loading, useQuasar } from 'quasar';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');

const login = async () => {
  try {
    Loading.show();

    const data = {
      email: email.value,
      password: password.value
    }

    const response = await axios.post('http://localhost:8090/api/auth/signin', data);

    console.log(response.data.response.token);

    localStorage.setItem('token', response.data.response.token);

    await router.push('/');
  } catch (e) {
    console.log(e);
  } finally {
    Loading.hide();
  }
};
</script>

<style scoped>

</style>
