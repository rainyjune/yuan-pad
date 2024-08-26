<script setup>
import Logo from "./components/Logo.vue"
</script>

<template>
  <header>
    <div class="container flexbox flex-justify-between">
      <div class="logo-container">
        <Logo />
      </div>
      <div class="user-container flexbox flex-align-item-center">
        <a>小象 Web 开发</a>
      </div>
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>

  <footer></footer>
</template>

<style scoped>
header {
  background-color: #333;

  .container {
    width: 1296px;
    background-color: red;
    margin: 0 auto;

    .logo-container {
      height: 72px;

      .logo {
        height: 100%;
      }
    }

    .user-container {
      padding-right: 20px;
      color: #fff;
    }
  }
}

@media (min-width: 1024px) {
  header {
  }

  .logo {
  }

  header .container {
  }
}
</style>
