<template>
  <q-page>
    <div class="q-mb-md text-h4 text-weight-bold text-primary text-center">
      Acerca del Proyecto
    </div>

    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-weight-bold q-mb-sm text-grey-9">
          Descripción del Proyecto
        </div>
        <p class="text-subtitle2 text-grey-7">
          Este proyecto, titulado <strong>"Notionary"</strong>, ha sido desarrollado
          como parte del curso correspondiente al 8vo ciclo. El objetivo principal es
          proporcionar una plataforma interactiva y funcional para gestionar tareas y
          organizarlas por categorias de manera eficiente, utilizando tecnologías modernas y buenas
          prácticas de desarrollo.
        </p>
        <p class="text-subtitle2 text-grey-7">Tecnologias utilizadas:</p>
        <ul class="text-subtitle2 text-grey-7">
          <li>Springboot</li>
          <li>JWT</li>
          <li>Vue 3</li>
          <li>Quasar</li>
          <li>ChartJS</li>
          <li>jwt-decode</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-weight-bold q-mb-sm text-grey-9">
          Curso y Docente
        </div>
        <p class="text-subtitle2 text-grey-7">
          Este proyecto forma parte del curso "Desarrollo de Aplicaciones Web", a cargo
          del Mg.  <strong>Juan Carlos Arcila Diaz</strong>. Durante el desarrollo del proyecto, se
          ha enfatizado la implementación de conceptos avanzados de backend con Springboot, seguridad con Spring Security,
          implementacion de frontend con Thymeleaf y
          bases de datos.
        </p>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 text-weight-bold q-mb-sm text-grey-9">
          Equipo de Trabajo
        </div>
        <p class="text-subtitle2 text-grey-7">
          El desarrollo de este proyecto fue realizado por los estudiantes:
        </p>
        <ul class="text-subtitle2 text-grey-7">
          <li>Bracamonte Nuñez Angie Sthephanie</li>
          <li>Gallo Aguila Luis Piero</li>
          <li>Galvez Otoya Percy Junior</li>
          <li>Garcia Davila Miguel Angel</li>
          <li>Mendoza Linares Alexis Ansony</li>
          <li>More Purihuaman Edward Smith</li>
        </ul>
        <p class="text-subtitle2 text-grey-7">
          Cada miembro del equipo desempeñó un papel fundamental, desde el diseño de la
          interfaz de usuario hasta la integración con bases de datos y pruebas.
        </p>
      </q-card-section>
    </q-card>

    <div class="text-center text-grey-6 text-caption">
      &copy; 2024 Notionary. Todos los derechos reservados.
    </div>
  </q-page>
</template>

<script setup>
// No se necesita lógica adicional para esta página estática.
</script>

<style scoped>
.q-card {
  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
}

.q-card-section {
  text-align: justify;
}

ul {
  margin-left: 20px;
  list-style-type: disc;
}
</style>
