<template>
  <div class="ui padded grid">
    <form class="loginView ui form">
      <div class="field">
        <img style="width: 10vw" src="./../assets/logo.png">
      </div>
      <div class="field">
        <label>Email</label>
        <input type="text" name="first-name" placeholder="Ime...">
      </div>
      <div class="field">
        <label>Geslo</label>
        <input type="password" name="last-name" placeholder="Priimek...">
      </div>
      <button class="ui primary button" type="submit">Prijava</button>
      <button class="ui secondary button" v-on:click="moveToRegistration()" type="button">Pojdi na registracijo</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    moveToRegistration() {
      window.location = '/register';
    }
  }
};
</script>