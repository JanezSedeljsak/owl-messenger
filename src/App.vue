<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      msgCount: 0
    };
  },
  methods: {
    moveUrl: link =>
      window.location.pathname != link ? (window.location = link) : null
  },
  created: function() {
    fetch("http://localhost:3000/api/auth/get-username", {
      method: "POST",
      body: JSON.stringify({ tokenString: sessionStorage.getItem("szr_auth") }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => {
        let user = Object.values(response.result[0]).map(x =>
          x.substr(0, 1).toUpperCase() + x.substr(1, x.length - 1).toLowerCase()
        ).join(" ");
        this.username = `${user}`;
      });
      //kekec
    fetch("http://localhost:3000/api/get/message-count")
      .then(res => res.json())
      .then(response => {
        this.msgCount = response.result;
      });
  }
};
</script>


<style lang="css">
@import "./assets/overwrite.css";
</style>