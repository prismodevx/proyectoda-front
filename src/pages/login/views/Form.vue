<template>
  <div class="row flex flex-center text-white" style="height: 100vh; background-color: #243345FF">
    <q-card flat class="rounded-card shadow-2" style="width: 360px; padding: 0px; border-radius: 6px;">
      <q-card-section>
        <div class="text-h4 text-weight-bold text-center q-pt-md text-grey-9">Notionary ;)</div>
      </q-card-section>
      <q-tabs
        v-model="activeTab"
        class="text-grey-9"
        active-color="primary"
        align="justify"
        unelevated
      >
        <q-tab name="login" label="Iniciar Sesión" />
        <q-tab name="register" label="Registrarse" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- Formulario de Iniciar Sesión -->
        <q-tab-panel name="login">
          <q-card-section>
            <div class="text-h6 text-center text-grey-5 q-mb-lg">Ingresar al sistema</div>
            <q-form greedy ref="refFormLogin">
              <q-input
                class="q-mb-lg"
                placeholder="Usuario"
                outlined
                v-model="usuario"
                dense
                hide-bottom-space
                no-error-icon
                clearable
                :rules="[
                  (v) => {
                    return !!v || 'El campo es obligatorio'
                  },
                  (v) => /^[a-zA-Z0-9_]+$/.test(v) || 'Solo se permiten letras, números y guiones bajos, sin espacios'
                ]"
              >
                <template #prepend>
                  <q-icon name="person"/>
                </template>
              </q-input>
              <q-input
                class="q-mb-lg"
                placeholder="Contraseña"
                type="password"
                outlined
                v-model="password"
                dense
                hide-bottom-space
                no-error-icon
                clearable
                :rules="[
                  (v) => {
                    return !!v || 'El campo es obligatorio'
                  },
                ]"
              >
                <template #prepend>
                  <q-icon name="lock"/>
                </template>
              </q-input>
              <q-btn
                label="Iniciar Sesión"
                color="primary"
                unelevated
                class="full-width q-mb-md"
                style="border-radius: 6px; height: 44px"
                @click="validateLogin"
              />
            </q-form>
          </q-card-section>
        </q-tab-panel>

        <!-- Formulario de Registro -->
        <q-tab-panel name="register">
          <q-card-section>
            <div class="text-h6 text-center text-grey-5 q-mb-lg">Crear una cuenta</div>
            <q-form greedy ref="refFormRegister">
              <q-input
                class="q-mb-lg"
                placeholder="Usuario"
                outlined
                v-model="usuario"
                dense
                hide-bottom-space
                no-error-icon
                clearable
                :rules="[
                  (v) => {
                    return !!v || 'El campo es obligatorio'
                  },
                  (v) => /^[a-zA-Z0-9_]+$/.test(v) || 'Solo se permiten letras, números y guiones bajos, sin espacios'
                ]"
              >
                <template #prepend>
                  <q-icon name="person"/>
                </template>
              </q-input>
              <q-input
                class="q-mb-lg"
                placeholder="Correo Electrónico"
                outlined
                v-model="email"
                dense
                hide-bottom-space
                no-error-icon
                clearable
                :rules="[
                  (v) => !!v || 'El campo es obligatorio',
                  (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'El formato del correo no es válido'
                ]"
              >
                <template #prepend>
                  <q-icon name="mail"/>
                </template>
              </q-input>
              <q-input
                class="q-mb-lg"
                placeholder="Nombre Completo"
                outlined
                v-model="nombreCompleto"
                dense
                hide-bottom-space
                no-error-icon
                clearable
                :rules="[
                  (v) => {
                    return !!v || 'El campo es obligatorio'
                  },
                ]"
              >
                <template #prepend>
                  <q-icon name="person_add"/>
                </template>
              </q-input>
              <q-input
                class="q-mb-lg"
                placeholder="Contraseña"
                type="password"
                outlined
                v-model="password"
                dense
                hide-bottom-space
                no-error-icon
                clearable
                :rules="[
                  (v) => {
                    return !!v || 'El campo es obligatorio'
                  },
                ]"
              >
                <template #prepend>
                  <q-icon name="lock"/>
                </template>
              </q-input>
              <q-btn
                label="Registrarse"
                color="primary"
                unelevated
                class="full-width q-mb-md"
                style="border-radius: 6px; height: 44px"
                @click="validateRegister"
              />
            </q-form>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Loading } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";
import { useDialogConfirm } from 'src/composables/useDialogConfirm';
import { useAlert } from 'src/composables/useAlert';

const router = useRouter();
const { dialogConfirm } = useDialogConfirm();
const { alert } = useAlert();

const activeTab = ref<"login" | "register">("login");

const email = ref<string>("");
const password = ref<string>("");
const usuario = ref<string>("");
const nombreCompleto = ref<string>("");

const refFormLogin = ref(null);
const refFormRegister = ref(null);

const validateLogin = async () => {
  if (refFormLogin.value) {
    await refFormLogin.value.validate().then(async (success: any) => {
      if (success) await login();
    });
  }
};

const login = async () => {
  try {
    Loading.show();
    const data = { usuario: usuario.value, password: password.value };
    const response = await axios.post("http://localhost:8090/api/auth/signin", data);

    localStorage.setItem('token', response.data.response.token);
    await router.push('/');
  } catch (e: any) {
    if (e.response.data.message == 'Bad credentials') {
      dialogConfirm({
        type: 'error',
        title: 'Uy!',
        msg: 'Credenciales incorrectas o usuario inactivo',
        onOk: () => {
          router.push('/login');
        },
        onCancel: () => {
          router.push('/login');
        },
      });
    }
  } finally {
    Loading.hide();
  }
};

const validateRegister = async () => {
  if (refFormRegister.value) {
    await refFormRegister.value.validate().then(async (success: any) => {
      if (success) await register();
    });
  }
};

const register = async () => {
  try {
    Loading.show();
    const data = {
      usuario: usuario.value,
      email: email.value,
      nombres: nombreCompleto.value,
      password: password.value,
    };
    const response = await axios.post("http://localhost:8090/api/auth/signup", data);
    console.log(response.data.message);
    if (response.data.success) {
      alert({
        type: 'success',
        title: 'Listo!',
        msg: 'Te has registrado'
      });
    }
    activeTab.value = "login";
  } catch (e) {
    console.error(e);
  } finally {
    Loading.hide();
  }
};

onMounted(() => {
  localStorage.removeItem('token');
  localStorage.removeItem('pomodoroTime');
})
</script>

<style scoped>
.bg-primary {
  background: #f0f4f8;
}

.rounded-card {
  border-radius: 12px;
}

.full-width {
  width: 100%;
}
</style>
