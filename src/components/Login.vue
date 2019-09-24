<template>
  <div class="ui padded grid">
    <form class="loginView ui form">
      <div class="field">
        <img style="width: 10vw" src="./../assets/logo.png">
      </div>
      <div class="field">
        <label>Email</label>
        <input type="text" v-model="form.email" placeholder="Ime...">
      </div>
      <div class="field">
        <label>Geslo</label>
        <input type="password" v-model="form.pass" placeholder="Geslo...">
      </div>
      <button class="ui primary button" v-on:click="login()" type="submit">Prijava</button>
      <button class="ui secondary button" v-on:click="moveToRegistration()" type="button">Pojdi na registracijo</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        pass: ""
      }
    };
  },
  methods: {
    moveToRegistration() {
      window.location = '/register';
    },
    login() {
      window.event.preventDefault();
      if(!Object.values(this.form).includes("")) {
          console.log("login bojda");
          fetch("http://localhost:3000/api/auth/get-user", {
            method: "POST",
            body: JSON.stringify(this.form),
            headers: { "Content-Type": "application/json" }
          })
          .then(res => res.json())
          .then(response => {
            if (!response.ok) {
              console.log(response.result);
            } else {
              sessionStorage.setItem("_tAuth", response.result.toString());
              window.location = "/home";
            }
          });
      }
    }
  }
};
</script>