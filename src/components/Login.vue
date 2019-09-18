<template>
  <div class="ui padded grid">
    <form class="loginView ui form">
      <div class="field">
        <img style="width: 10vw" src="./../assets/logo.png">
      </div>
      <div class="field">
        <label>Email</label>
        <input type="text" v-model="form.email" name="first-name" placeholder="Ime...">
      </div>
      <div class="field">
        <label>Geslo</label>
        <input type="password" v-model="form.pass" name="last-name" placeholder="Priimek...">
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
      let { form } = this;
      if(!Object.values(form).includes("")) {
        if(form.pass = form.re_pass) {
          console.log("create acc");
          fetch("http://localhost:3000/api/auth/get-user", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
          })
          .then(res => res.json())
          .then(response => {
              this.$swal(response.result);
          });
        }
      }
    }
  }
};
</script>