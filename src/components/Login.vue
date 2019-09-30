<template>
  <div class="ui padded grid">
    <form class="loginView ui form">
      <div class="field">
        <img style="width: 10vw" src="./../assets/logo.png" />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="text" v-model="form.email" placeholder="Ime..." />
      </div>
      <div class="field">
        <label>Geslo</label>
        <input type="password" v-model="form.pass" placeholder="Geslo..." />
      </div>
      <button v-tooltip="'Default login'" class="rnd-btn ui primary button" v-on:click="login()" type="submit">
        <i class="key icon"></i>
      </button>
      <button v-tooltip="'Facebook login'" class="rnd-btn ui blue button" v-on:click="fbAuth()" type="submit">
        <i class="facebook f icon"></i>
      </button>
      <button v-tooltip="'Google login'" class="rnd-btn ui red button" v-on:click="googleAuth()" type="submit">
        <i class="google icon"></i>
      </button>
      <button v-tooltip="'Go to register'" class="rnd-btn ui secondary button" v-on:click="moveToRegistration()" type="button">
        <i class="pencil alternate icon"></i>
      </button>
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
      window.location = "/register";
    },
    fbAuth() {
      window.fbAsyncInit = function() {
        FB.init({
          appId: "2425422854217017",
          cookie: true,
          xfbml: true,
          version: "v4.0"
        });

        FB.AppEvents.logPageView();
      };

      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    },
    googleAuth() {
        console.log("#todo");
    },
    login() {
      window.event.preventDefault();
      if (!Object.values(this.form).includes("")) {
        console.log("login bojda", this.form);
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