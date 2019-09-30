<template>
  <div class="ui padded grid">
    <form class="loginView ui form">
      <div class="field">
        <img style="width: 10vw" src="./../assets/logo.png" />
      </div>
      <div class="field">
        <label>Ime</label>
        <input type="text" v-model="form.name" name="first-name" placeholder="Ime..." />
      </div>
      <div class="field">
        <label>Priimek</label>
        <input type="text" v-model="form.surname" name="first-name" placeholder="Priimek..." />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="text" v-model="form.email" name="first-name" placeholder="Email..." />
      </div>
      <div class="field">
        <label>Geslo</label>
        <input type="password" v-model="form.pass" name="last-name" placeholder="Geslo..." />
      </div>
      <div class="field">
        <label>Ponovi geslo</label>
        <input type="password" v-model="form.re_pass" name="first-name" placeholder="Geslo..." />
      </div>
      <button
        v-tooltip="'Register'"
        class="rnd-btn ui primary button"
        v-on:click="register()"
        type="submit"
      >
        <i class="fly icon"></i>
      </button>
      <button
        v-tooltip="'Go to login'"
        class="rnd-btn ui secondary button"
        v-on:click="moveToLogin()"
        type="button"
      >
        <i class="unlock icon"></i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
        pass: "",
        re_pass: ""
      }
    };
  },
  methods: {
    moveToLogin() {
      window.location = "/login";
    },
    register() {
      window.event.preventDefault();
      let { form } = this;
      if (!Object.values(form).includes("")) {
        if ((form.pass = form.re_pass)) {
          console.log("create acc");
          fetch("http://localhost:3000/api/auth/create-user", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" }
          })
            .then(res => res.json())
            .then(response => {
              this.$swal(response.result);
              this.form = {
                name: "",
                surname: "",
                email: "",
                pass: "",
                re_pass: ""
              };
            });
        }
      }
    }
  }
};
</script>