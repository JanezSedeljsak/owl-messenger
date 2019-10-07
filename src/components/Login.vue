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
      <button
        v-tooltip="'Default login'"
        class="rnd-btn ui primary button"
        v-on:click="login()"
        type="submit"
      >
        <i class="key icon"></i>
      </button>
      <button
        v-tooltip="'Facebook login'"
        class="rnd-btn ui blue button"
        v-on:click="fbAuth()"
        type="submit"
      >
        <i class="facebook f icon"></i>
      </button>
      <button id="google-signin-btn" type="button"></button>
      <button
        v-tooltip="'Go to register'"
        class="rnd-btn ui secondary button"
        v-on:click="moveToRegistration()"
        type="button"
      >
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
      const auth2 = gapi.auth2.getAuthInstance();
      console.log(auth2);
      /*window.fbAsyncInit = function() {
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
        js = d.createElement(
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");*/
      window.event.preventDefault();
    },
    googleAuth() {
      this.onSignIn();
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      
      //if user was not found end proccessssss
      if(!profile) return;

      let form = {
        google_id: profile["Eea"],
        email: profile["U3"],
        name: profile["ofa"],
        surname: profile["wea"],
      };
      console.log(form, profile);
      fetch("http://localhost:3000/api/auth/google-auth", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => {
          if (!response.ok) {
            console.log(response.result);
          } else {
            sessionStorage.setItem("_tAuth", response.result.toString());
            window.location = "/";
          }
        });
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
              window.location = "/";
            }
          });
      }
    }
  },
  mounted() {
    /*const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log("user signed out");
    });*/
    gapi.signin2.render("google-signin-btn", {
      // this is the button "id"
      onsuccess: this.onSignIn // note, no "()" here
    });
  }
};
</script>