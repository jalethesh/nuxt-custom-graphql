<template>
  <header class="fixed inset-x-0 z-10">
    <div class="container lg:py-6 py-3 flex justify-between items-center mx-auto px-5 lg:px-0">
      <nuxt-link to="/" class="hidden md:block btn-back">Go back</nuxt-link>
      <a href="/">
        <img
          class="logo"
          src="~/static/logo.png"
          alt="logo"
          width="234.333"
          height="43.057"
        />
      </a>
      <div class="flex items-center">
        <img src="~/static/icons/Safety.svg" alt="lock" class="mr-3" />
        <h4 class="label">Secure payment</h4>
      </div>
    </div>
  </header>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
header {
  background: #fecb06;
  margin: 0;

  .container {
    max-width: 1240px;
    font-family: var(--font-family--primary);
  }

  .btn-back {
    font-family: var(--font-family--primary);
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    text-decoration: underline;
  }

  .logo {
    height: 35px;
    width: 35px;
    display: block;
  }

  .label {
    font-family: "Lato";
    font-weight: 700;
  }
}
/* checkout header responsive */
@media (max-width: 850px) {
  header .btn-land,
  header .btn-back {
    font-size: 13px;
  }
}

@media (max-width: 570px) {
  header .container {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  header .logo {
    max-width: 101px;
  }
}

@media (max-width: 550px) {
  header .btn-land,
  header .btn-back {
    font-size: 11px;
  }
}

@media (max-width: 477px) {
  header .btn-land {
    margin-top: 15px;
  }
}
</style>
